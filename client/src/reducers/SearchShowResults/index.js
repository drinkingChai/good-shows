import axios from 'axios'

const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'

const setSearchResults = (results) => ({ type: SET_SEARCH_RESULTS, results })

const initialState = {
  searchStr: '',
  page: '1',
  results: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_SEARCH_RESULTS:
      return action.results
    default:
      return
  }
}

export const searchShows = (searchStr, page = '1') => dispatch =>
  axios.get(`/api/search?name=${searchStr}&page=${page}`)
    .then(res => dispatch(setSearchResults(res.data)))

export const setPage = (page) => dispatch =>
  'str'
