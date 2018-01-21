import { combineReducers, createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import popularShows from './popularShows'
import currentUser from './currentUser'
import searchShowResults from './searchShowResults'

export default createStore(
  combineReducers({
    popularShows,
    currentUser,
    searchShowResults
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)
