import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
// Nessesary in the Product Reducer?
const GET_ALL_PRODUCT = 'GET_ALL_PRODUCT'

const SELECT_PRODUCT = 'SELECT_PRODUCT'
const DESELECT_PRODUCT = 'DESELECT_PRODUCT'
// Not in Product Store Concerns
// const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
// const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'

const GET_PRODUCTS_BY_TAG = 'GET_PRODUCTS_BY_TAG'
const GET_PRODUCTS_BY_TYPE = 'GET_PRODUCTS_BY_TYPE'

// UI Feature of Reducer (IE keep track of when it's loaded)

const PRODUCT_IS_LOADING = 'PRODUCT_IS_LOADING'
const PRODUCT_IS_LOADED = 'PRODUCT_IS_LOADED'
const PRODUCT_LOAD_ERR = 'PRODUCT_LOAD_ERR'
const PRODUCT_TAG_LOADING = 'PRODUCT_TAG_LOADING'
const PRODUCT_TAG_LOADED = 'PRODUCT_TAG_LOADED'
const PRODUCT_TAG_ERR = 'PRODUCT_TAG_ERR'
const PRODUCT_TYPE_LOADING = 'PRODUCT_TAG'
const PRODUCT_TYPE_LOADED = 'PRODUCT_TYPE_LOADED'
const PRODUCT_TYPE_ERR = 'PRODUCT_TYPE_ERR'

/**
 * INITIAL STATE
 */

// Should there be an array of products?
const defaultProduct = {
  product: {},
  products: [],
  loadStatus: {
    productLoading: false,
    productLoadErr: false,
    productLoaded: false,
    productTagLoading: false,
    productTagLoaded: false,
    productTagErr: false,
    productTypeLoading: false,
    productTypeLoaded: false,
    productTypeErr: false
  }
}

/**
 * ACTION CREATORS
 */
// note how get all products takes in an array while others take objects.
export const getAllProducts = products => ({type: GET_ALL_PRODUCT, products})

export const selectProduct = product => ({type: SELECT_PRODUCT, product})
export const deselectProduct = product => ({type: DESELECT_PRODUCT, product})

export const getProductsByTags = productsByTag => ({
  type: GET_PRODUCTS_BY_TAG,
  productsByTag
})
export const getProductsByType = productsByType => ({
  type: GET_PRODUCTS_BY_TYPE,
  productsByType
})

/**
 * THUNK CREATORS
 */

// get product?
export const getProductTHUNK = () => {
  console.log("This is hit")
  return async dispatch => {
    try {
      // ???
      const productArray = await axios.get('/api/products')
      const productData = productArray.data
      console.log(productData)
      dispatch(getAllProducts(productData))
    } catch (err) {
      console.error(err)
    }
  }
}

// get tags?

// Check these routes?
export const getProductsByTagsTHUNK = tags => async dispatch => {
  try {
    const productsByTags = await axios.get(`/api/products/${tags}`)

    dispatch(getProductsByTags(productsByTags))
  } catch (err) {
    console.error(err)
  }
}
// get types?

export const getProductsByTypesTHUNK = types => async dispatch => {
  try {
    const productsByTypes = await axios.get(`/api/products/${types}`)
    dispatch(getProductsByType(productsByTypes))
  } catch (err) {
    console.error(err)
  }
}

// We should consider refactoring this Reducer. Perhaps seperating Loading states out to a seperate Reducer.
// eslint-disable-next-line
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_ALL_PRODUCT:
      return {...state, products: action.products}
    case SELECT_PRODUCT:
      return {...state, product: action.product}
    case DESELECT_PRODUCT:
      return {...state, product: {}}
    case GET_PRODUCTS_BY_TAG:
      return {...state, products: action.productsByTag}
    case GET_PRODUCTS_BY_TYPE:
      return {...state, products: action.productsByType}
    case PRODUCT_IS_LOADING:
      return {
        ...state,
        loadStatus: {
          ...state.loadStatus,
          productLoading: true,
          productLoaded: false,
          productLoadErr: false
        }
      }
    case PRODUCT_IS_LOADED:
      return {
        ...state,
        loadStatus: {
          ...state.loadStatus,
          productLoading: false,
          productLoaded: true,
          productLoadErr: false
        }
      }
    case PRODUCT_LOAD_ERR:
      return {
        ...state,
        loadStatus: {
          ...state.loadStatus,
          productLoading: false,
          productLoaded: false,
          productLoadErr: true
        }
      }
    case PRODUCT_TAG_LOADING:
      return {
        ...state,
        loadStatus: {
          ...state.loadStatus,
          productTagLoading: true,
          productTagLoaded: false,
          productTagErr: false
        }
      }
    case PRODUCT_TAG_LOADED:
      return {
        ...state,
        loadStatus: {
          ...state.loadStatus,
          productTagLoading: false,
          productTagLoaded: true,
          productTagErr: false
        }
      }
    case PRODUCT_TAG_ERR:
      return {
        ...state,
        loadStatus: {
          ...state.loadStatus,
          productTagLoading: false,
          productTagLoaded: false,
          productTagErr: true
        }
      }
    case PRODUCT_TYPE_LOADING:
      return {
        ...state,
        loadStatus: {
          ...state.loadStatus,
          productTypeLoading: true,
          productTypeLoaded: false,
          productTypeErr: false
        }
      }
    case PRODUCT_TYPE_LOADED:
      return {
        ...state,
        loadStatus: {
          ...state.loadStatus,
          productTypeLoading: false,
          productTypeLoaded: true,
          productTypeErr: false
        }
      }
    case PRODUCT_TYPE_ERR:
      return {
        ...state,
        loadStatus: {
          ...state.loadStatus,
          productTypeLoading: false,
          productTypeLoaded: false,
          productTypeErr: true
        }
      }
    default:
      return state
  }
}
