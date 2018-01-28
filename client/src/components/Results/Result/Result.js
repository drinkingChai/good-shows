import React, { Component } from 'react'
import './Result.css'
import getPosterUrl from '../../../utils/getPosterUrl'
import { connect } from 'react-redux'
import { mapState } from '../../../mappers/user'
import { Link } from 'react-router-dom'

class Result extends Component {
  state = {
    name: '',
    posterPath: '',
    overview: '',
    tmdbId: 0,
    menuOpen: false,
    cursor: {},
    inList: false
  }

  componentWillReceiveProps = nextProps => {
    let inList = nextProps.allShows.find(s => +s.tmdbId === +this.state.tmdbId)
    inList = inList ? inList.list.name : false
    this.setState({ inList })
  }

  componentDidMount = () => {
    // info from tmdb
    let { name, overview, id } = this.props.info
    overview = overview.length > 200 ? overview.slice(0, 200).trim() + '...' : overview
    const posterPath = this.props.info.poster_path

    // check if it's in list
    let inList = this.props.allShows.find(s => +s.tmdbId === +this.props.info.id)
    inList = inList ? inList.list.name : false

    this.setState({ name, overview, posterPath, tmdbId: id, inList })
  }

  handlePlusClick = (ev) => {
    this.setState({ menuOpen: true })
  }

  closeMenu = () => {
    this.setState({ menuOpen: false })
  }

  render = () => {
    return (
      <div className='Result' ref={ node => this.node = node }>
        <span className='title'>{ this.state.name }</span>
        <div className='image'>
          <img src={ getPosterUrl(342, this.state.posterPath) } alt='poster' />
        </div>
        <p>{ this.state.overview }</p>

        <div className='buttons'>
        { /* !this.state.inList ?
          <a onClick={ this.handlePlusClick }><i className="fas fa-plus"></i></a> :
          <a onClick={ this.handlePlusClick }><i className="fas fa-check"></i></a> */ }
          <Link to={ `/show/${this.state.tmdbId}` }><i className='fas fa-check'></i></Link>
          <a><i className="fas fa-share"></i></a>
          <a><i className="fas fa-star"></i></a>
        </div>
      </div>
    )
  }
}

export default connect(mapState)(Result);
