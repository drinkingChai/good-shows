import React, { Component } from 'react'
import { connect } from 'react-redux'
import qs from 'qs'

// styles
import './SearchPage.scss'

// components
import Input from '../Input/Input'
import SearchResult from './SearchResult/SearchResult'

// utils
import { searchTmdb } from '../../utils'

class SearchPage extends Component {
  state = {
    input: '',
    interval: null,
    results: [],
    page: 1
  }

  componentDidMount = () => {
    let query = qs.parse(this.props.location.search.slice(1))
    if (query.input) {
      this.setState({ input: query.input, page: query.page || 1 }, () => {
        this.setSearchResults()
      })
    }
  }

  handleSearch = (ev) => {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }
    let interval = setInterval(() => {
      clearInterval(this.state.interval)
      this.setSearchResults()
    }, 500)

    this.setState({ input: ev.target.value, interval })
  }

  setSearchResults = () => {
    this.props.search(this.state.input, this.state.page)
      .then(({ page, results }) => {
        this.setState({ page, results, interval: null })
        this.props.history.push({
          pathname: '/search',
          search: `?input=${this.state.input}&page${page}`
        })
      })
  }

  render = () => {
    return (
      <div className='SearchPage'>
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
export default connect(null, mapDispatch)(SearchPage)