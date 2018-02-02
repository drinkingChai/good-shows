import React, { Component } from 'react'
import { connect } from 'react-redux'
import qs from 'qs'

// styles
import './SearchPage.scss'

// components
import Input from '../Input/Input'
import SearchResult from './SearchResult/SearchResult'

// mappers
import { mapState, mapDispatch } from '../../mappers/search.mapper'

class SearchPage extends Component {
  state = {
    input: '',
    interval: null,
    results: [],
    page: 1
  }

  componentWillReceiveProps = nextProps => {
    const { search } = nextProps
    if (search) {
      const { page, results } = search
      this.setState({ results, page })
    }
  }

  componentDidMount = () => {
    let { input, page } = qs.parse(this.props.location.search.slice(1))
    if (input) {
      this.setState({ input, page }, () => {
        this.props.searchShows(input, page)
      })
    }
  }

  handleSearch = (ev) => {
    let { interval } = this.state

    clearInterval(interval)

    if (!ev.target.value) {
      clearInterval(interval)
      this.props.searchShows()
    } else {
      interval = setInterval(() => {
        clearInterval(interval)

        let { input, page } = this.state
        this.props.searchShows(input, page)
        this.props.history.push({
          pathname: '/search',
          search: `?input=${this.state.input}&page=${page}`
        })
      }, 500)
    }

    this.setState({ input: ev.target.value, interval })
  }

  render = () => {
    const { input, results } = this.state

    return (
      <div className='SearchPage'>
        <Input
          value={ input }
          onChange={ this.handleSearch }
          placeholder='SEARCH' />

      { !results.length ?
        <div></div> :
        <div>
        { results.map((result, i) =>
          <SearchResult result={ result } key={ i } /> )}
        </div> }
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(SearchPage)