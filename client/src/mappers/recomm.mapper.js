import { openRecomm, makeRecomms, reset } from '../reducers/recomm.reducer'
import { getShow } from '../reducers/show.reducer'
import { setMessage } from '../reducers/message.reducer'

export const mapState = ({ recomm, show, friends }) => ({
  open: recomm.isOpen,
  show,
  friends: friends.friends,
  friendIds: friends.friends.reduce((obj, f) => {
    obj[f.id] = false
    return obj
  }, {})
})

export const mapDispatch = dispatch => ({
  openRecomm(tmdbId) {
    return dispatch(getShow(tmdbId))
      .then(() => dispatch(openRecomm()))
  },
  closeRecomm() {
    dispatch(reset())
  },
  makeRecomms(showInfo, sendTo) {
    return dispatch(makeRecomms(showInfo, sendTo))
      .then(() => dispatch(reset()))
      .then(() => dispatch(setMessage('SENT!')))
  }
})