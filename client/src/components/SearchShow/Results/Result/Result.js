import React, { Component } from 'react'
import './Result.css'
import getPosterUrl from '../../../../utils/getPosterUrl'
import LocalModal from '../../../LocalModal/LocalModal'
import ListPopup from '../../../Popups/ListPopup/ListPopup'

class Result extends Component {
  state = {
    name: '',
    posterPath: '',
    overview: '',
    tmdbId: 0,
    menuOpen: false,
    cursor: {}
  }

  componentDidMount = () => {
    let { name, overview, id } = this.props.info
    overview = overview.length > 280 ? overview.slice(0, 250).trim() + '...' : overview
    const posterPath = this.props.info.poster_path
    this.setState({ name, overview, posterPath, tmdbId: id })
  }

  handlePlusClick = (ev) => {
    let cursorX = ev.pageX - this.node.offsetLeft
    let cursorY = ev.pageY - this.node.offsetTop
    this.setState({ menuOpen: true, cursor: { x: cursorX, y: cursorY } })
  }

  render = () => {
    return (
      <div className='Result' ref={ node => this.node = node }>
        <LocalModal open={ this.state.menuOpen } cursor={ this.state.cursor } hideClose>
          <ListPopup tmdbId={ this.state.tmdbId }/>
        </LocalModal>

        <h4>{ this.state.name }</h4>
        <div className='image'>
          <img src={ getPosterUrl(342, this.state.posterPath) } alt='poster' />
        </div>
        <p>{ this.state.overview }</p>

        <div className='buttons'>
          <a onClick={ this.handlePlusClick }><i className="fas fa-plus"></i></a>
          <a><i className="fas fa-share"></i></a>
          <a><i className="fas fa-star"></i></a>
          <a><i className="fas fa-ellipsis-h"></i></a>
        </div>
      </div>
    )
  }
}

export default Result;
