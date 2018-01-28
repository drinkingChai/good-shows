import { getUserLists } from '../reducers/userLists'
import { getAllShows } from '../reducers/userAllShows'
import axios from 'axios'

const addShow = (tmdbId, list) => dispatch =>
  axios.post('/api/show', { tmdbId, list })

const removeShow = (tmdbId) => dispatch =>
  axios.delete(`/api/show/${tmdbId}`)

const changeList = (tmdbId, fromList, toList) => dispatch =>
  axios.put('/api/show/changelist', { tmdbId, fromList, toList })

export const mapDispatch = dispatch => ({
  addShowToList(tmdbId, list) {
    return dispatch(addShow(tmdbId, list))
      .then(() => dispatch(getUserLists()))
      .then(() => dispatch(getAllShows()))
  },
  removeShowFromList(tmdbId) {
    return dispatch(removeShow(tmdbId))
      .then(() => dispatch(getUserLists()))
      .then(() => dispatch(getAllShows()))
  },
  changeListTo(tmdbId, fromList, toList) {
    return dispatch(changeList(tmdbId, fromList, toList))
      .then(() => dispatch(getUserLists()))
      .then(() => dispatch(getAllShows()))
  }
})
