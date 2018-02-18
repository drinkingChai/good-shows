import { getFriendSearch, getUserFriends, getFriendRequests, requestAdd, confirmFriend } from '../reducers/friends.reducer'
import { setMessage } from '../reducers/message.reducer'

export const mapState = ({ friends, friend }) => ({
  friends: friends.friends,
  requests: friends.requests,
  friendSearch: friends.friendSearch,
  friend: friend
})

export const mapDispatch = dispatch => ({
  searchFriends(input) {
    return dispatch(getFriendSearch(input))
  },
  makeFriendRequest(id) {
    return dispatch(requestAdd(id))
      .then(() => dispatch(getUserFriends()))
      .then(() => dispatch(getFriendRequests()))
      .then(() => dispatch(setMessage('Request Sent!')))
  },
  confirmFriendRequest(id) {
    return dispatch(confirmFriend(id))
      .then(() => dispatch(getUserFriends()))
      .then(() => dispatch(getFriendRequests()))
      .then(() => dispatch(setMessage('Added!')))
  }
})