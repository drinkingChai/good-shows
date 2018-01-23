import { addShow, removeShow, changeList } from '../utils/shows'
import { getUserLists } from '../reducers/userLists'
import { getUserShows } from '../reducers/userShows'

export const mapDispatch = dispatch => ({
  addShowToList(tmdbId, list) {
    return dispatch(addShow(tmdbId, list))
      .then(() => dispatch(getUserLists()))
      .then(() => dispatch(getUserShows()))
  },
  removeShowFromList(tmdbId) {
    return dispatch(removeShow(tmdbId))
      .then(() => dispatch(getUserLists()))
      .then(() => dispatch(getUserShows()))
  },
  changeListTo(tmdbId, list) {
    return dispatch(changeList(tmdbId, list))
      .then(() => dispatch(getUserLists()))
      .then(() => dispatch(getUserShows()))
  }
})
