import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { save, load } from "redux-localstorage-simple"
import user from './user'
import orders from './order'
import product from './product'
import about from './about'

const reducer = combineReducers({user, product, orders, about})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './order'
export * from './product'
export * from './about'
