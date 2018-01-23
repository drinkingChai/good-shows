import React, { Component } from 'react'
import './Result.css'
import getPosterUrl from '../../../../utils/getPosterUrl'
import { connect } from 'react-redux'
import { mapState } from '../../../../mappers/user'

class Result extends Component {
  state = {
    name: '',
    posterPath: '',
    overview: '',
    menuOpen: false
  }

  componentDidMount = () => {
    let { name, overview } = this.props.info
    overview = overview.length > 280 ? overview.slice(0, 280).trim() + '...' : overview
    const posterPath = this.props.info.poster_path
    this.setState({ name, overview, posterPath })
  }

  render = () => {
    return (
      <div className='Result'>
        <h4>{ this.state.name }</h4>
        <div className='image'>
          <img src={ getPosterUrl(342, this.state.posterPath) } alt='poster' />
        </div>
        <p>{ this.state.overview }</p>

        <div className='buttons'>
          <a><i className="fas fa-plus"></i></a>
          <a><i className="fas fa-share"></i></a>
          <a><i className="fas fa-star"></i></a>
          <a><i className="fas fa-ellipsis-h"></i></a>
        </div>
      </div>
    )
  }
}

export default connect(mapState)(Result);
