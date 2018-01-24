import axios from 'axios'

// list is the <String> name of the list
export const addShow = (tmdbId, list) => dispatch =>
  axios.post('/api/show', { tmdbId, list: list || null })

export const removeShow = (tmdbId) => dispatch =>
  axios.delete('/api/show', { tmdbId })

export const changeList = (tmdbId, list) => dispatch =>
  axios.put('/api/show/list', { tmdbId, list })