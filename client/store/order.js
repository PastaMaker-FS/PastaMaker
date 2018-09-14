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
const addItem = (item) => ({
  type: ORDERS.ITEMS.ADD,
  item
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
  console.log('---------------- fetchOrders')
  dispatch(loadingOrders(true));
  try {
    const {data: orders} = await axios.get(`/api/users/${userId}/orders`);
    console.log(`--- orders from db: ${JSON.stringify(orders)}`)
    dispatch(setAllOrders(orders));
    dispatch(loadingOrders(false));
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


/**
 * REDUCER
 */
export default function(state = defaultOrders, action) {
  switch (action.type) {
    case ORDERS.SET:
      console.log('ORDERS.SET')
      return {
        ...state,
        list: action.orders
      }
    case ORDERS.ITEMS.ADD:
      let cart = state.orders
        .filter(order => !order.isPurchased)
      let idx = state.orders
        .map(order => order.id)
        .indexOf(cart.id)
      return {
        ...state,
        list: [
          ...state.orders.slice(0, idx),
          {
            ...state.orders[idx],
            products: [
              ...state.order[idx].products,
              action.item
            ]
          },
          ...state.orders.slice(idx + 1)
        ]
      }
    case ORDERS.LOADING:
      return {
        ...state,
        isLoading: action.loading
      }
    case ORDERS.Error:
      return {
        ...state,
        isError: action.error
      }
    default:
      return state
  }
}