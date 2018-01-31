import React, { Component } from 'react'
import { connect } from 'react-redux'

// styles
import './Show.scss'

// mappers
import { mapState, mapDispatch } from '../../mappers/show.mapper'

// components
import Poster from '../Poster/Poster'

class Show extends Component {
  state = {
    show: {},
    favorite: false,
    private: false,
    list: 'To Watch'
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ show: nextProps.show })
  }

  componentDidMount = () => {
    let { tmdbId } = this.props.match.params
    if (tmdbId) this.props.getShow(tmdbId)
  }

  render = () => {
    const { show } = this.state

    return (
      <div className='Show'>
        <div className='top'>
          <Poster src={ show.poster_path } size={ 185 } />

          <div className='right'>
            <h4>{ show.name }</h4>

            <div className='stat'>
              <span>{ show.vote_average }</span>
              <label>RATING</label>
            </div>

            <div className='stat'>
              <span>{ show.first_air_date }</span>
              <label>RELEASED</label>
            </div>
          </div>
        </div>

        <p className='overview'>{ show.overview }</p>

        <div className='prompts'>
          <div className='prompt-group'>
            <label>FAVORITE?</label>
            <span><i className='fa fa-star'></i></span>
          </div>

          <div className='prompt-group'>
            <label>PRIVATE?</label>
            <span><i className='fa fa-check'></i></span>
          </div>
        </div>

        <div className='lists'>
          <label>PICK A LIST</label>
          <ul>
            <li>
              <span>To Watch</span>
              <i className='fa fa-check'></i>
            </li>
            <li>
              <span>Watched</span>
              <i className='fa fa-check'></i>
            </li>
          </ul>
        </div>

        <a>SAVE</a>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(Show)