import axios from 'axios'

const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
const SET_PAGES = 'SET_PAGES'

const setSearchResults = (results) => ({ type: SET_SEARCH_RESULTS, results })
const setResultPages = (page, totalPages) => ({ type: SET_PAGES, page, totalPages })

const initialState = {
  searchStr: '',
  page: '1',
  totalPages: '1',
  results: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_SEARCH_RESULTS:
      return { ...state, results: action.results }
    case SET_PAGES:
      return { ...state, page: action.page, totalPages: action.totalPages }
    default:
      return state
  }
}

export const searchShows = (searchStr, page = '1') => dispatch =>
  axios.get(`/api/search?name=${searchStr}&page=${page}`)
    .then(res => {
      let data = res.data,
          { page, results } = data,
          totalPages = data.total_pages

      dispatch(setSearchResults(results))
      dispatch(setResultPages(page, totalPages))
    })

export const setPage = (page) => dispatch =>
  'str'
