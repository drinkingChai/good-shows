import axios from 'axios'
import { setClientAuth, removeClientAuth } from '../../utils'

const SET_USER = 'SET_USER'

const setUser = (user) => ({ type: SET_USER, user })

const initialState = {
  userInfo: {},
  token: ''
}

export default function (state = initialState, action) {
  switch(action.type) {
    case SET_USER:
      return !action.user ? initialState : action.user
    default:
      return state
  }
}

export const signIn = (email, password) => dispatch =>
  axios.post('/api/auth/local', { email, password })
    .then(res => {
      setClientAuth(res.data.token)
      dispatch(setUser(res.data))
    })

export const regAndSignIn = (name, email, password) => dispatch =>
  axios.post('/api/auth/new', { name, email, password })
    .then(res => {
      setClientAuth(res.data.token)
      dispatch(setUser(res.data))
    })

export const verifyClientToken = (token) => dispatch =>
  axios.post('/api/auth/verify', { token })
    .then(res => {
      setClientAuth(res.data.token)
      dispatch(setUser(res.data))
    })

export const signOut = () => dispatch => {
  removeClientAuth()
  dispatch(setUser())
}
