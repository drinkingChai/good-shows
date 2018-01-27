import { getUserLists } from '../reducers/userLists'
import { getAllShows } from '../reducers/userAllShows'
import axios from 'axios'

const addShow = (tmdbId, list) => dispatch =>
  axios.post('/api/show', { tmdbId, list })

const removeShow = (tmdbId) => dispatch =>
  axios.delete(`/api/show/${tmdbId}`)

const changeList = (tmdbId, list) => dispatch =>
  axios.put('/api/show/list', { tmdbId, list })

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
  changeListTo(tmdbId, list) {
    return dispatch(changeList(tmdbId, list))
      .then(() => dispatch(getUserLists()))
      .then(() => dispatch(getAllShows()))
  }
})
