import { combineReducers, createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import popularShows from './popularShows'

export default createStore(
  combineReducers({
    popularShows
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)
