import axios from 'axios'

const SET_FRIEND_SEARCH = 'SET_FRIEND_SEARCH'
const SET_FRIENDS = 'SET_FRIENDS'

const setFriendSearch = (friendSearch) => ({ type: SET_FRIEND_SEARCH, friendSearch })
const setFriends = (friends) => ({ type: SET_FRIENDS, friends })

const initialState = {
  friends: [],
  friendSearch: []
}

export default function (state = initialState, action) {
  switch(action.type) {
    case SET_FRIEND_SEARCH:
      return { ...state, friendSearch: action.friendSearch }
    case SET_FRIENDS:
      return { ...state, friends: action.friends }
    default:
      return state
  }
}

export const getFriendSearch = input => dispatch =>
  axios.get(`/api/friends/search?input=${input}`)
    .then(res => dispatch(setFriendSearch(res.data)))

export const requestAdd = friendId => dispatch =>
  axios.post('/api/friends/request', { friendId })

export const getUserFriends = input => dispatch =>
  axios.get('/api/friends')
    .then(res => dispatch(setFriends(res.data)))