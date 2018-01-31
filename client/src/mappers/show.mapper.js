import { getShow } from '../reducers/show.reducer'

export const mapState = ({ user, show }) => ({
  user: user.info,
  show
})

export const mapDispatch = dispatch => ({
  getShow(tmdbId) {
    return dispatch(getShow(tmdbId))
  },
  addShow(data) {
    
  }
})