import axios from 'axios'

const SET_FRIEND_SHOWS = 'SET_FRIEND_SHOWS'

const setFriendShows = friendShows => ({ type: SET_FRIEND_SHOWS, friendShows })

const initialState = []

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_FRIEND_SHOWS:
      return action.friendShows
    default:
      return state
  }
}

export const getFriendShows = friendId => dispatch =>
  axios.get(`/api/friends/${friendId}/shows`)
    .then(res => dispatch(setFriendShows(res.data)))