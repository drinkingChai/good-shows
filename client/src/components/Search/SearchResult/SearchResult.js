import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// styles
import './SearchResult.scss'

// utils
import { getPosterUrl } from '../../../utils'

class SearchResult extends Component {
  state = {
    poster_path: '',
    overview: '',
    name: '',
    id: ''
  }

  componentDidMount = () => {
    this.setState({ ...this.props.result })
  }

  render = () => {
    const { name, poster_path, overview } = this.state

    return (
      <div className='SearchResult'>
        <img src={ getPosterUrl(185, poster_path) } className='poster' alt='poster' />

        <section>
          <h4 className='title'>{ name }</h4>
          <p className='overview'>{ overview.length > 125 ? overview.slice(0, 125) + '...' : overview }</p>
          <div className='buttons'>
            <a><i className='fa fa-star'></i></a>
            <Link to={ `/show/${this.state.id}` }><i className='fa fa-plus'></i></Link>
          </div>
        </section>
      </div>
    )
  }
}

export default SearchResult