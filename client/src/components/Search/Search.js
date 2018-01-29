import React, { Component } from 'react'
import { connect } from 'react-redux'

// styles
import './Search.css'

// components
import Input from '../Input/Input'

// utils
import { searchTmdb } from '../../utils'

class Search extends Component {
  state = {
    input: '',
    interval: null
  }

  handleSearch = (ev) => {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }
    let interval = setInterval(() => {
      this.props.search(this.state.input)
      
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