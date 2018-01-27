import React, { Component } from 'react'
import './Result.css'
import getPosterUrl from '../../../utils/getPosterUrl'
import { connect } from 'react-redux'
import { mapState } from '../../../mappers/user'
import ListPopup from '../../Popups/ListPopup/ListPopup'
import PopupWrapper from '../../Popups/PopupWrapper/PopupWrapper'

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
    let inList = nextProps.allShows.shows.find(s => +s.tmdbId === +this.state.tmdbId)
    inList = inList ? inList.list.name : false
    this.setState({ inList })
  }

  componentDidMount = () => {
    let { name, overview, id } = this.props.info
    overview = overview.length > 200 ? overview.slice(0, 200).trim() + '...' : overview
    const posterPath = this.props.info.poster_path
    let inList = this.props.allShows.shows.find(s => +s.tmdbId === +this.props.info.id)
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
        <PopupWrapper
          open={ this.state.menuOpen }
          onClose={ this.closeMenu }
          cursor={ this.state.cursor }
        >
          <ListPopup
            tmdbId={ this.state.tmdbId }
            inList={ this.state.inList }
          />
        </PopupWrapper>

        <span className='title'>{ this.state.name }</span>
        <div className='image'>
          <img src={ getPosterUrl(342, this.state.posterPath) } alt='poster' />
        </div>
        <p>{ this.state.overview }</p>

        <div className='buttons'>
          <a onClick={ this.handlePlusClick }>
            { this.state.inList ? <i className="fas fa-check"></i> : <i className="fas fa-plus"></i> }
          </a>
          <a><i className="fas fa-share"></i></a>
          <a><i className="fas fa-star"></i></a>
          <a><i className="fas fa-ellipsis-h"></i></a>
        </div>
      </div>
    )
  }
}

export default connect(mapState)(Result);
