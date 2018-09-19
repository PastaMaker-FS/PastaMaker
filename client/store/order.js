import axios from 'axios';

/**
 * INITIAL STATE
 */
const defaultOrders = {
	list: [],
	isLoading: false,
	isError: false
};

/**
 * ACTION TYPES
 */
const ORDERS = {
  SET: 'SET_ALL_ORDERS',
  SET_ONE: 'SET_ONE_ORDER',
  ITEMS: {
    ADD: 'ADD_ITEM_TO_CART',
    REMOVE: 'REMOVE_ITEM_FROM_CART',
    SET: 'SET_ONE_ITEM'
  },
  LOADING: 'LOADING_ORDERS',
  ERROR: 'ERROR_ORDERS'
}

/**
 * ACTION CREATORS
 */

const setAllOrders = (orders, local) => ({
	type: ORDERS.SET,
  orders: orders,
  local
});
const setOrder = (order, local) => ({
	type: ORDERS.SET_ONE,
  order,
  local
});
const setItem = (item, local) => ({
	type: ORDERS.ITEMS.SET,
  item,
  local
});
const addItem = (item, local) => ({
  type: ORDERS.ITEMS.ADD,
  item,
  local
})
const removeItem = (orderId, productId, local) => ({
  type: ORDERS.ITEMS.REMOVE,
  orderId,
  productId,
  local
})
const loadingOrders = (loading) => ({
	type: ORDERS.LOADING,
  loading
});
const errorOrders = (error) => ({
	type: ORDERS.ERROR,
	error
});

/**
 * THUNK CREATORS
 */

const fetchOrdersRemote = async (user) => {
  // preload cart with local storage
  if (localStorage.getItem('orders')) {
    // create cart
    const {data: serverOrders} = await axios.get(`/api/users/${user.id}/orders`)
    // move local stored items to cart
    let state = JSON.parse(localStorage.getItem('orders'));
    state.list[0].products.map(async product => {
      const {data: serverNewItem} = await axios.post(`/api/users/${user.id}/orders`, {
        productId: product.id,
        quantity: product.quantity,
      })
    })
    // clear store so only prelod once
    localStorage.clear();
  }
  // rebuild
  const {data: serverOrders} = await axios.get(`/api/users/${user.id}/orders`)
  return [serverOrders, false];
}

const fetchOrdersLocal = () => {

  let state = JSON.parse(localStorage.getItem('orders'));
  let orders = state
    ? state.list
    : [{
        id: -1,
        orderNumber: null,
        totalPrice: null,
        isPurchased: false,
        datePurchased: null,
        products: []
      }]
  return [orders, true]
}

export const fetchOrders = (user) => async (dispatch) => {

  dispatch(loadingOrders(true));
  try {

    const [orders, local] = user.id
      ? await fetchOrdersRemote(user)
      : fetchOrdersLocal();

    dispatch(setAllOrders(orders, local));
  } catch (error) {
    console.error(error)
    dispatch(errorOrders(true));
  }
}

// const createItemRemote = async () => {}
// const createItemLocal = () => {}

export const createItem = (user, product, quantity) => async (dispatch) => {

  let local = false;
  let newItem;
  try {
    if (user.id) {
      const {data: serverNewItem} = await axios.post(`/api/users/${user.id}/orders`, {
        productId: product.id,
        quantity
      })
      newItem = serverNewItem;
    } else {
      local = true;
      newItem = {
        id: product.id,
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: product.price,
        purchasePrice: null,
        quantity,
        imgUrl: product.imgUrl,
      }
    }

    dispatch(addItem(newItem, local))
  } catch (err) {
    console.error(err)
    dispatch(errorOrders(true))
  }
}

export const destroyItem = (user, orderId, productId) => async (dispatch) => {

  let local = false;
  try {
    if (user.id) {
      await axios.delete(`/api/users/${user.id}/orders/${orderId}/${productId}`, productId)
    } else {
      local = true;
    }

    dispatch(removeItem(orderId, productId, local))
  } catch (err) {
    dispatch(errorOrders(true))
  }
}



export const incrementItem = (user, orderId, productId) => async (dispatch) => {

  let local = false;
  let updatedItem;
  try {
    if (user.id) {
      const {data: item} = await axios.get(`/api/users/${user.id}/orders/${orderId}/${productId}`)
      const {data: serverUpdatedItem} = await axios.put(`/api/users/${user.id}/orders/${orderId}/${productId}`,
        {
          quantity: item.quantity + 1,
          purchasePrice: item.purchasePrice
        })
      updatedItem = serverUpdatedItem
      } else {
        local = true;
        let state = JSON.parse(localStorage.getItem('orders'));
        const product = state.list[0].products.filter(p => p.id === productId)[0]
        updatedItem = {
          id: product.id,
          name: product.name,
          description: product.description,
          stock: product.stock,
          price: product.price,
          purchasePrice: null,
          quantity: Number(product.quantity) + 1,
          imgUrl: product.imgUrl,
        }
      }
    console.log(`----------------udpatedItem ${JSON.stringify(updatedItem)}`)
    dispatch(setItem(updatedItem, local))
  } catch (err) {
    console.error(err)
    dispatch(errorOrders(true))
  }
}

export const decrementItem = (user, orderId, productId) => async (dispatch) => {

  let local = false;
  let updatedItem;
  try {
    if (user.id) {
      const {data: item} = await axios.get(`/api/users/${user.id}/orders/${orderId}/${productId}`)
      const {data: serverUpdatedItem} = await axios.put(`/api/users/${user.id}/orders/${orderId}/${productId}`,
        {
          quantity: item.quantity - 1,
          purchasePrice: item.purchasePrice
        })
        updatedItem = serverUpdatedItem
    } else {
      local = true;
      let state = JSON.parse(localStorage.getItem('orders'));
        const product = state.list[0].products.filter(p => p.id === productId)[0]
        updatedItem = {
          id: product.id,
          name: product.name,
          description: product.description,
          stock: product.stock,
          price: product.price,
          purchasePrice: null,
          quantity: Number(product.quantity) - 1,
          imgUrl: product.imgUrl,
        }
    }

    dispatch(setItem(updatedItem, local))
  } catch (err) {
    dispatch(errorOrders(true))
  }
}

export const purchaseOrder = (user, orderId, price) => async (dispatch) => {
  let local = false;
  try {

    // update items in order
    if (user.id) {
      const {data: orders} = await axios.get(`/api/users/${user.id}/orders`);
      const cart = orders.filter(order => order.isPurchased === false)[0];
      await Promise.all(
        cart.products.map(async product => {
          const {data: updatedItem} = await axios.put(`/api/users/${user.id}/orders/${orderId}/${product.id}`, {
            purchasePrice: product.price,
          })
          dispatch(setItem(updatedItem, local))
        })
      )
    } else {
      local = true;
      let state = JSON.parse(localStorage.getItem('orders'));
      state.list[0].products.map(async product => {
        const updatedItem = {
          id: product.id,
          name: product.name,
          description: product.description,
          stock: product.stock,
          price: product.price,
          purchasePrice: product.price,
          quantity: product.quantity,
          imgUrl: product.imgUrl,
        }
        dispatch(setItem(updatedItem, local))
      })
    }

    // update order
    let updatedOrder;
    if (user.id) {
      const {data: serverUpdatedOrder} = await axios.put(`/api/users/${user.id}/orders/${orderId}`, {
        totalPrice: price,
        isPurchased: true,
        datePurchased: Date.now()
      })
      updatedOrder = serverUpdatedOrder;
    } else {
      local = true;
      let state = JSON.parse(localStorage.getItem('orders'));
      const order = state.list[0]
      updatedOrder = {
        id: -1,
        orderNumber: order.orderNumber,
        totalPrice: price,
        isPurchased: true,
        datePurchased: Date.now(),
        products: order.products
      }
      localStorage.clear();
    }
    dispatch(setOrder(updatedOrder, local))
  } catch (error) {
    dispatch(errorOrders(true))
  }
}

/**
 * Middleware
 */


/**
 * REDUCER
 */
export default function(state = defaultOrders, action) {

  let cart, idx, cartIdx, itemIdx, nextState;

  switch (action.type) {

    case ORDERS.SET:
      nextState = {
        //...state,
        list: action.orders,
        isLoading: false,
        isError: false
      }

      if (action.local) {
        localStorage.setItem('orders', JSON.stringify(nextState));
      }
      return nextState

    case ORDERS.SET_ONE:

      cart = state.list
        .filter(order => order.isPurchased === false)[0]

      idx = state.list
        .map(order => order.id)
        .indexOf(cart.id)

      nextState = {
        ...state,
        list: [
          ...state.list.slice(0, idx),
          action.order,
          ...state.list.slice(idx + 1)
        ]
      }

      if (action.local) {
        localStorage.setItem('orders', JSON.stringify(nextState));
      }
      return nextState

    case ORDERS.ITEMS.SET:

      cart = state.list
        .filter(order => order.isPurchased === false)[0]

      cartIdx = state.list
        .map(order => order.id)
        .indexOf(cart.id)

      itemIdx = cart.products
        .map(product => product.id)
        .indexOf(action.item.id)

      nextState = {
        ...state,
        list: [
          ...state.list.slice(0, cartIdx),
          {
            ...state.list[cartIdx],
            products: [
              ...state.list[cartIdx].products.slice(0,itemIdx),
              {...state.list[cartIdx].products[itemIdx], ...action.item},
              ...state.list[cartIdx].products.slice(itemIdx+1)
            ]
          },
          ...state.list.slice(cartIdx + 1)
        ]
      }

      if (action.local) {
        localStorage.setItem('orders', JSON.stringify(nextState));
      }
      return nextState;

    case ORDERS.ITEMS.ADD:

      cart = state.list
        .filter(order => order.isPurchased === false)[0]

      idx = state.list
        .map(order => order.id)
        .indexOf(cart.id)

      nextState = {
        ...state,
        list: [
          ...state.list.slice(0, idx),
          {
            ...state.list[idx],
            products: [
              ...state.list[idx].products,
              action.item
            ]
          },
          ...state.list.slice(idx + 1)
        ]
      }

      if (action.local) {
        localStorage.setItem('orders', JSON.stringify(nextState));
      }
      return nextState;

    case ORDERS.ITEMS.REMOVE:

      cart = state.list
      .filter(order => order.isPurchased === false)[0]

      cartIdx = state.list
      .map(order => order.id)
      .indexOf(action.orderId)

      itemIdx = cart.products
      .map(product => product.id)
      .indexOf(action.productId)

      nextState = {
        ...state,
        list: [
          ...state.list.slice(0, cartIdx),
          {
            ...state.list[cartIdx],
            products: [
              ...state.list[cartIdx].products.slice(0,itemIdx),
              ...state.list[cartIdx].products.slice(itemIdx+1)
            ]
          },
          ...state.list.slice(cartIdx + 1)
        ]
      }

      if (action.local) {
        localStorage.setItem('orders', JSON.stringify(nextState));
      }
      return nextState;

    case ORDERS.LOADING:
      return {
        ...state,
        isLoading: action.loading
      }

    case ORDERS.ERROR:
      return {
        ...state,
        isError: action.error
      }

    default:
      return state
  }
}

// utils -------------------------------


