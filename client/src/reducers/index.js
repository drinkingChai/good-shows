import { combineReducers, createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import search from './search.reducer'
import user from './user.reducer'
import show from './show.reducer'
import usershows from './usershows.reducer'

export default createStore(
  combineReducers({
    search,
    user,
    show,
    usershows
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)
