import { getShow } from '../reducers/show.reducer'
import { addShow, getUserShows } from '../reducers/usershows.reducer'

export const mapState = ({ user, show }) => ({
  user: user.info,
  show
})

export const mapDispatch = dispatch => ({
  getShow(tmdbId) {
    return dispatch(getShow(tmdbId))
  },
  addShow(show) {
    return dispatch(addShow(show))
    .then(() => dispatch(getUserShows()))
  }
})