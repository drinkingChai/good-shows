import { combineReducers, createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import search from './search.reducer'
import user from './user.reducer'
import friends from './friends.reducer'
import show from './show.reducer'
import usershows from './usershows.reducer'
import friendshows from './friendshows.reducer'
import message from './message.reducer'

export default createStore(
  combineReducers({
    search,
    user,
    friends,
    friendshows,
    show,
    usershows,
    message
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)
