import { getFriendShows } from '../reducers/friendshows.reducer'

export const mapState = ({ friends, friendshows }, ownProps) => ({
  friend: friends.friends.find(f => +f.id === +ownProps.match.params.friendId) || {},
  favorites: friendshows.filter(s => s.favorite),
  toWatch: friendshows.filter(s => s.list === 'To Watch'),
  watched: friendshows.filter(s => s.list === 'Watched')
})

export const mapDispatch = dispatch => ({
  getShows(friendId) {
    return dispatch(getFriendShows(friendId))
  } 
})