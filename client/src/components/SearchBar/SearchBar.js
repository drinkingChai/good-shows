import React, { Component } from 'react'
import './SearchBar.css'
import Input from '../Input/Input'

class SearchBar extends Component {
  state = {
    input: '',
    interval: null
  }

  debounce = (ev) => {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }

    let interval = setInterval(() => {
      this.props.debounceFn(this.state.input)
      clearInterval(this.state.interval)
    }, this.props.debounceTime || 500)

    this.setState({ interval, input: ev.target.value })
  }

  render = () => {
    return (
      <div className='SearchBar'>
        <Input
          placeholder={ this.props.placeHolder || 'Search' }
          value={ this.state.input }
          onChange={ this.debounce } />
      </div>
    )
  }
}

export default SearchBar
