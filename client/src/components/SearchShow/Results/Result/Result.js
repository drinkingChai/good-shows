import React, { Component } from 'react'
import './Result.css'
import getPosterUrl from '../../../../utils/getPosterUrl'
import LocalModal from '../../../LocalModal/LocalModal'
import ListPopup from '../../../Popups/ListPopup/ListPopup'
import { connect } from 'react-redux'
import { mapState } from '../../../../mappers/user'

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

  componentDidMount = () => {
    let { name, overview, id } = this.props.info
    overview = overview.length > 280 ? overview.slice(0, 250).trim() + '...' : overview
    const posterPath = this.props.info.poster_path
    const inList = this.props.shows.find(s => s.showData.tmdbId === id) ? true : false
    this.setState({ name, overview, posterPath, tmdbId: id, inList })
  }

  handlePlusClick = (ev) => {
    let cursorX = ev.pageX - this.node.offsetLeft
    let cursorY = ev.pageY - this.node.offsetTop
    this.setState({ menuOpen: true, cursor: { x: cursorX, y: cursorY } })
  }

  closeMenu = () => {
    this.setState({ menuOpen: false })
  }

  render = () => {
    return (
      <div className='Result' ref={ node => this.node = node }>
        <LocalModal open={ this.state.menuOpen } onClose={ this.closeMenu } cursor={ this.state.cursor } hideClose>
          <ListPopup tmdbId={ this.state.tmdbId }/>
        </LocalModal>

        <h4>{ this.state.name }</h4>
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
