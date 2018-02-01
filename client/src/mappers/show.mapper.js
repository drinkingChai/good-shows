import { getShow } from '../reducers/show.reducer'
import { addShow, getUserShows, updateShow } from '../reducers/usershows.reducer'
import { getSearchResults } from '../reducers/search.reducer'

export const mapState = ({ user, show, usershows }) => ({
  user: user.info,
  show,
  usershows,
  watched: usershows.filter(show => show.list === 'Watched'),
  toWatch: usershows.filter(show => show.list === 'To Watch'),
  userShowIds: usershows.reduce((obj, showItem) => {
    obj[showItem.show.tmdbId] = true
    return obj
  }, {})
})

export const mapDispatch = dispatch => ({
  getShow(tmdbId) {
    console.log('firing from reducer')
    return dispatch(getShow(tmdbId))
  },
  addShow(show) {
    return dispatch(addShow(show))
    .then(() => dispatch(getUserShows()))
  },
  updateShow(id, show) {
    return dispatch(updateShow(id, show))
    .then(() => dispatch(getUserShows()))
  },
  searchShows(name, page = 1) {
    return dispatch(getSearchResults(name, page))
  }
})