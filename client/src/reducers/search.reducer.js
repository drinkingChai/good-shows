import axios from 'axios'

const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'

const setSearchResults = (results) => ({ type: SET_SEARCH_RESULTS, results })

const initialState = {
  page: 1,
  total_pages: 1,
  results: []
}

export default function (state = initialState, action) {
  switch(action.type) {
    case SET_SEARCH_RESULTS:
      return action.results
    default:
      return state
  }
}

export const getSearchResults = (name, page = '1') => dispatch => {
  if (!name) return dispatch(setSearchResults(initialState))

  return axios.get(`/api/search?name=${name}&page=${page}`)
    .then(res => dispatch(setSearchResults(res.data)))
}
