import axios from 'axios'

export const setClientAuth = (token) => {
  localStorage['token'] = token

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const removeClientAuth = () => {
  delete localStorage['token']
  delete axios.defaults.headers.common['Authorization']
}
