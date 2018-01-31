import { combineReducers, createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import user from './user.reducer'
import show from './show.reducer'
import usershows from './usershows.reducer'

export default createStore(
  combineReducers({
    user,
    show,
    usershows
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)
