import axios from 'axios'

export const searchByStr = (searchStr, page = '1') => (dispatch) =>
  axios.get(`/api/search?name=${searchStr}&page=${page}`)
    .then(res => { return res.data })

export const searchByTmdbId = (tmdbId) =>
  axios.get(`/api/show/${tmdbId}`)
    .then(res => { return res.data })
