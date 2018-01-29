import axios from 'axios'

export const searchTmdb = (searchStr, page = '1') => dispatch =>
  axios.get(`/api/search/name?name=${searchStr}&page=${page}`)
    .then(res => { return res.data })

export const searchTmdbSingle = (tmdbId) => dispatch =>
  axios.get(`/api/search/id?id=${tmdbId}`)
