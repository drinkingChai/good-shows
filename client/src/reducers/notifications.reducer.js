import axios from 'axios'

const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS'

const setNotifications = notifications => ({ type: SET_NOTIFICATIONS, notifications })

// get notifications from the back end and display on fe

const initialState = {}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_NOTIFICATIONS:
      return action.notifications
    default:
      return state
  }
}

export const getNotifications = () => dispatch =>
  axios.get('/api/notifications')
    .then(res => dispatch(setNotifications(res.data)))