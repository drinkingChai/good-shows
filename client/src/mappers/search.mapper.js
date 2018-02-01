import { getSearchResults } from '../reducers/search.reducer'

export const mapState = ({ search }) => ({
  search 
})

export const mapDispatch = dispatch => ({
  searchShows(name, page = 1) {
    return dispatch(getSearchResults(name, page))
  }
})