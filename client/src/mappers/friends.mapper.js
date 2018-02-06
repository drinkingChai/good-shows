import { getFriendSearch, requestAdd } from '../reducers/friends.reducer'

export const mapState = ({ friends }) => ({
  friends: friends.friends.filter(f => f.status === 'friends'),
  requests: friends.friends.filter(f => f.status === 'pending'),
  friendSearch: friends.friendSearch
})

export const mapDispatch = dispatch => ({
  searchFriends(input) {
    return dispatch(getFriendSearch(input))
  },
  makeFriendRequest(id) {
    return dispatch(requestAdd(id))
  }
})