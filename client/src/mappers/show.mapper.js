import { getShow } from '../reducers/show.reducer'
import { addShow, getUserShows, updateShow } from '../reducers/usershows.reducer'

export const mapState = ({ user, show, usershows }) => ({
  user: user.info,
  show,
  usershows
})

export const mapDispatch = dispatch => ({
  getShow(tmdbId) {
    return dispatch(getShow(tmdbId))
  },
  addShow(show) {
    return dispatch(addShow(show))
    .then(() => dispatch(getUserShows()))
  },
  updateShow(id, show) {
    return dispatch(updateShow(id, show))
    .then(() => dispatch(getUserShows()))
  }
})