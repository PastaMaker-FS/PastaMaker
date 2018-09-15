import axios from 'axios'

/**
 * INITIAL STATE
 */
const defaultOrders = {
  list: [],
  isLoading: false,
  isError: false,
}

/**
 * ACTION TYPES
 */
const ORDERS = {
  SET: 'SET_ALL_ORDERS',
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

const setAllOrders = (orders) => ({
  type: ORDERS.SET,
  orders
})
const setItem = (item) => ({
  type: ORDERS.ITEMS.SET,
  item
})
const addItem = (item) => ({
  type: ORDERS.ITEMS.ADD,
  item
})
const removeItem = (orderId, productId) => ({
  type: ORDERS.ITEMS.REMOVE,
  orderId,
  productId
})
const loadingOrders = (loading) => ({
  type: ORDERS.LOADING,
  loading
})
const errorOrders = (error) => ({
  type: ORDERS.ERROR,
  error
})

/**
 * THUNK CREATORS
 */

export const fetchOrders = (userId) => async (dispatch) => {
  dispatch(loadingOrders(true));
  try {
    const {data: orders} = await axios.get(`/api/users/${userId}/orders`);
    dispatch(setAllOrders(orders));
  } catch (error) {
    dispatch(errorOrders(true));
  }
}

export const createItem = (userId, productId) => async (dispatch) => {
  try {
    const {data: newItem} = await axios.post(`/api/users/${userId}/orders`, productId)
    dispatch(addItem(newItem))
  } catch (err) {
    dispatch(errorOrders(true))
  }
}

export const destroyItem = (userId, orderId, productId) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/${userId}/orders/${orderId}/${productId}`, productId)
    dispatch(removeItem(orderId, productId))
  } catch (err) {
    dispatch(errorOrders(true))
  }
}

export const incrementItem = (orderId, productId) => async (dispatch) => {
  try {
    const {data: item} = await axios.get(`/api/items/${orderId}/${productId}`)
    const {data: updatedItem} = await axios.put(`/api/items/${orderId}/${productId}`,
      {
        quantity: item.quantity + 1,
        purchasePrice: item.purchasePrice
      })
    dispatch(setItem(updatedItem))
  } catch (err) {
    dispatch(errorOrders(true))
  }
}

export const decrementItem = (orderId, productId) => async (dispatch) => {
  try {
    const {data: item} = await axios.get(`/api/items/${orderId}/${productId}`)
    const {data: updatedItem} = await axios.put(`/api/items/${orderId}/${productId}`,
      {
        quantity: item.quantity - 1,
        purchasePrice: item.purchasePrice
      })
    dispatch(setItem(updatedItem))
  } catch (err) {
    dispatch(errorOrders(true))
  }
}


/**
 * REDUCER
 */
export default function(state = defaultOrders, action) {

  let cart, idx, cartIdx, itemIdx;

  switch (action.type) {

    case ORDERS.SET:
      return {
        ...state,
        list: action.orders,
        isLoading: false
      }

    case ORDERS.ITEMS.ADD:

      [cart] = state.list
        .filter(order => !order.isPurchased)

      idx = state.list
        .map(order => order.id)
        .indexOf(cart.id)

      return {
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

    case ORDERS.ITEMS.REMOVE:

      [cart] = state.list
      .filter(order => !order.isPurchased)

      cartIdx = state.list
      .map(order => order.id)
      .indexOf(action.orderId)

      itemIdx = cart.products
      .map(product => product.id)
      .indexOf(action.productId)

      return {
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
