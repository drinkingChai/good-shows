import { getFriendSearch, getUserFriends, getFriendRequests, requestAdd, confirmFriend } from '../reducers/friends.reducer'

export const mapState = ({ friends }) => ({
  friends: friends.friends,
  requests: friends.requests,
  friendSearch: friends.friendSearch
})

export const mapDispatch = dispatch => ({
  searchFriends(input) {
    return dispatch(getFriendSearch(input))
  },
  makeFriendRequest(id) {
    return dispatch(requestAdd(id))
  },
  confirmFriendRequest(id) {
    return dispatch(confirmFriend(id))
      .then(() => dispatch(getUserFriends()))
      .then(() => dispatch(getFriendRequests()))
  }
})