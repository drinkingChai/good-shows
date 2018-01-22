import React, { Component } from 'react'
import './SearchShow.css'
import { connect } from 'react-redux'
import SearchBar from '../SearchBar/SearchBar'
import searchShows from '../../utils/searchShows'
import Results from './Results/Results'
import Paginator from '../Paginator/Paginator'

class SearchShow extends Component {
  state = {
    page: 1,
    totalPages: 1,
    results: [],
    searchStr: ''
  }

  searchFn = (searchStr) => {
    this.props.search(searchStr)
      .then((result) => this.setResults(result, searchStr))
  }

  changePage = (pageNum) => {
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
        <SearchBar
          placeHolder='search for movies or shows'
          debounceFn={ this.searchFn }
          debounceTime={ 500 } />

        <div className='divider'></div>

        <Results results={ this.state.results } />

        <Paginator
          page={ this.state.page }
          totalPages={ this.state.totalPages }
          onPageChange={ this.changePage } />
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  search(searchStr, page) {
    return dispatch(searchShows(searchStr, page))
  }
})
export default connect(null, mapDispatch)(SearchShow)
