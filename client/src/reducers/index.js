import { combineReducers, createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import popularShows from './popularShows'
import currentUser from './currentUser'
import userLists from './userLists'
import userShows from './userShows'

export default createStore(
  combineReducers({
    popularShows,
    currentUser,
    userLists,
    userShows
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)
