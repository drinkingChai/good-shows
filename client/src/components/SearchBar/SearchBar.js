import React, { Component } from 'react'
import './SearchBar.css'

class SearchBar extends Component {
  state = {
    input: '',
    interval: null
  }

  debounce = (ev) => {
    this.setState({ input: ev.target.value })

    if (this.state.interval) {
      clearInterval(this.state.interval)
    }

    this.state.interval = setInterval(() => {
      this.props.debounceFn(this.state.input)
      clearInterval(this.state.interval)
    }, this.props.debounceTime || 500)
  }

  render = () => {
    return (
      <div className='SearchBar'>
        <input
          placeholder={ this.props.placeHolder || 'Search' }
          value={ this.state.input }
          onChange={ this.debounce } />
      </div>
    )
  }
}

export default SearchBar
