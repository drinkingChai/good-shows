import React, { Component } from 'react'
import './SearchShow.css'
import { connect } from 'react-redux'
import SearchBar from '../SearchBar/SearchBar'
import { searchShows } from '../../reducers/SearchShowResults'

class SearchShow extends Component {
  state = {
    shows: []
  }

  searchFn = (searchStr) => {
    this.props.search(searchStr)
  }

  render = () => {
    return (
      <div className='SearchShow'>
        <SearchBar
          placeHolder='Search for A Show or a Movie'
          debounceFn={ this.searchFn }
          debounceTime={ 500 } />
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  search(searchStr) {
    dispatch(searchShows(searchStr))
  }
})
export default connect(null, mapDispatch)(SearchShow)
