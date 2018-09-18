import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_USER = 'ADD_USER'
const UPDATE_USER = 'UPDATE_USER'
const GET_ALL_USER = 'GET_ALL_USER'
const USER_IS_LOADING = 'USER_IS_LOADING'
const USER_LOADED = 'USER_LOADED'
const GET_ONE_USER = 'GET_ONE_USER'
const SET_MESSAGE = 'SET_MESSAGE'

/**
 * INITIAL STATE
 */
const defaultUser = {
  users: [],
  message: {},
  user: {},
  status: {
    userLoaded: false,
    userLoading: false
  }
}

/**
 * ACTION CREATORS
 */
export const getUser = user => ({type: GET_USER, user})
export const removeUser = () => ({type: REMOVE_USER})
export const addUser = user => ({type: ADD_USER, user})
export const updateUser = user => ({type: UPDATE_USER, user})
export const singleUser = user => ({type: GET_ONE_USER, user})
export const getAllUser = users => ({type: GET_ALL_USER, users})
const setMessage = message => ({type: SET_MESSAGE, message})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/allproducts')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const newUser = user => {
  let res
  let content = user
  return async dispatch => {
    try {
      res = await axios.post('/api/users', content)
      if (res.data.message === 'User Already Exists!') {
        dispatch(setMessage(res.data.message))
      } else {
        dispatch(getUser(res.data))
        history.push('/allproducts')
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const allUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch(getAllUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const update = user => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/users/`)
      await dispatch(updateUser(res.data))
    } catch (err) {
      console.error(err)
    }
  }
}

//Not sure if we need this since auth has api/auth/me which gets a single user

export const oneUser = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}`)
    dispatch(singleUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case SET_MESSAGE:
      return {...state, message: action.message}
    case GET_ONE_USER:
      return {...state, user: action.user}
    case ADD_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return {...state, user: action.user}
    case GET_ALL_USER:
      return {...state, users: [...state.users, action.users]}
    case USER_IS_LOADING:
      return {
        ...state,
        status: {
          ...state.status,
          userLoaded: false,
          userLoading: true
        }
      }
    case USER_LOADED:
      return {
        ...state,
        status: {
          ...state.status,
          userLoaded: true,
          userLoading: false
        }
      }
    default:
      return state
  }
}
