import { combineReducers, createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import currentUser from './currentUser'

export default createStore(
  combineReducers({
    currentUser
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)
