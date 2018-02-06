import { getFriendSearch } from '../reducers/friends.reducer'

export const mapDispatch = dispatch => ({
  searchFriends(input) {
    return dispatch(getFriendSearch(input))
  }
})