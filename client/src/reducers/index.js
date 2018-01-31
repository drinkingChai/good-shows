import { combineReducers, createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import user from './user.reducer'
import show from './show.reducer'

export default createStore(
  combineReducers({
    user,
    show
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)
