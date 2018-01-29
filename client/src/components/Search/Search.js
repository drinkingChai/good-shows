import React, { Component } from 'react'
import { connect } from 'react-redux'
// import qs from 'qs'

// styles
import './Search.css'

// components
import Input from '../Input/Input'
import SearchResult from './SearchResult/SearchResult'

// utils
import { searchTmdb } from '../../utils'

class Search extends Component {
  state = {
    input: '',
    interval: null,
    results: [],
    page: 1
  }

  componentDidMount = () => {
  }

  handleSearch = (ev) => {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }
    let interval = setInterval(() => {
      this.props.search(this.state.input, this.state.page)
        .then(({ page, results }) => {
          this.setState({ page, results })
        })
      
      clearInterval(this.state.interval)
      this.setState({ interval: null })
    }, 500)

    this.setState({ input: ev.target.value, interval })
  }

  render = () => {
    return (
      <div className='Search'>
        <Input
          value={ this.state.input }
          onChange={ this.handleSearch }
          placeholder='SEARCH' />

      { !this.state.results.length ?
        <div></div> :
        <div>
        { this.state.results.map((result, i) =>
          <SearchResult result={ result } key={ i } /> )}
        </div> }
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  search(input, page) {
    return dispatch(searchTmdb(input, page))
  }
})
export default connect(null, mapDispatch)(Search)