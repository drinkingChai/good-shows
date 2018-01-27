import { combineReducers, createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import popularShows from './popularShows'
import currentUser from './currentUser'
import userLists from './userLists'
import userAllShows from './userAllShows'

export default createStore(
  combineReducers({
    popularShows,
    currentUser,
    userLists,
    userAllShows
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)
