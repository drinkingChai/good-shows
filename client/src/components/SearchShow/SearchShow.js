import React, { Component } from 'react'
import './SearchShow.css'
import { connect } from 'react-redux'
import SearchBar from '../SearchBar/SearchBar'
import { searchByStr } from '../../utils/searchShows'
import Results from '../Results/Results'
import Paginator from '../Paginator/Paginator'
import qs from 'qs'
import Lists from '../Lists/Lists'
import Sidebar from '../Sidebar/Sidebar'
import { mapState } from '../../mappers/user'

class SearchShow extends Component {
  state = {
    page: 1,
    totalPages: 1,
    results: [],
    searchStr: ''
  }

  componentDidMount = () => {
    let query = qs.parse(this.props.location.search.slice(1))
    if (query.search) { this.searchFn(query.search) }
  }

  searchFn = (searchStr) => {
    this.props.search(searchStr)
      .then((result) => this.setResults(result, searchStr))
      .then(() => this.props.history.push({
        pathname: '/lists',
        search: `?search=${searchStr}`
      }))
  }

  changePage = (pageNum) => {
    window.scrollTo({
      left: 0,
      top: 0
    })
    this.props.search(this.state.searchStr, pageNum)
      .then((result) => this.setResults(result, this.state.searchStr))
  }

  setResults = (result, searchStr) => {
    const { page, total_pages, results } = result
    this.setState({ page, totalPages: total_pages, results, searchStr })
  }

  render = () => {
    return (
      <div className='SearchShow'>
        <Sidebar>
          <SearchBar
            placeHolder='Search'
            debounceFn={ this.searchFn }
            debounceTime={ 500 } />

          <p>My Lists</p>
          <Lists lists={ this.props.lists } />
        </Sidebar>

        <div className="search-results">
          <Results results={ this.state.results } />
          <Paginator
            page={ this.state.page }
            totalPages={ this.state.totalPages }
            onPageChange={ this.changePage } />
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  search(searchStr, page) {
    return dispatch(searchByStr(searchStr, page))
  }
})
export default connect(mapState, mapDispatch)(SearchShow)
