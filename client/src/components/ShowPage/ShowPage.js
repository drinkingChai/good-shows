import React, { Component } from 'react'
import { connect } from 'react-redux'

// styles
import './ShowPage.scss'

// mappers
import { mapState, mapDispatch } from '../../mappers/show.mapper'

// components
import Poster from '../Poster/Poster'
import Button from '../Button/Button'
import BackButton from '../BackButton/BackButton'

// utils
import { formatDate } from '../../utils'

class Show extends Component {
  state = {
    show: {},
    favorite: false,
    isPrivate: false,
    list: 'To Watch',
    listNames: ['To Watch', 'Watched'],
    showItemId: null
  }

  componentWillReceiveProps = nextProps => {
    let { tmdbId } = nextProps.match.params
    let showItem = nextProps.usershows.find(si => +si.show.tmdbId === +tmdbId)
    if (showItem) {
      const { show, favorite, isPrivate, list } = showItem
      this.setState({ show, favorite, isPrivate, list, showItemId: showItem.id })
    } else {
      this.setState({ show: nextProps.show })
    }
  }

  componentDidMount = () => {
    window.scrollTo(0, 0)
    let { tmdbId } = this.props.match.params
    let showItem = this.props.usershows.find(si => +si.show.tmdbId === +tmdbId)
    if (showItem) {
      const { show, favorite, isPrivate, list } = showItem
      this.setState({ show, favorite, isPrivate, list, showItemId: showItem.id })
    } else {
      this.props.getShow(tmdbId)
    }
  }

  saveHandler = () => {
    if (this.state.showItemId) {
      const { favorite, isPrivate, list } = this.state
      this.props.updateShow(this.state.showItemId, { favorite, isPrivate, list })
    } else {
      this.props.addShow(this.state)
    }
  }

  changeListHandler = (listName) => (ev) => {
    this.setState({ list: listName })
  }

  changePropHandler = (propName) => (ev) => {
    this.setState({ [propName]: !this.state[propName] })
  }

  render = () => {
    const { show, listNames, list, favorite, isPrivate, showItemId } = this.state

    return (
      <div className='ShowPage'>
        <BackButton />

        <div className='top'>
          <Poster src={ show.poster_path } size={ 185 } />

          <div className='right'>
            <h4>{ show.name }</h4>

            <div className='stat'>
              <span>{ show.vote_average }</span>
              <label>RATING</label>
            </div>

            <div className='stat'>
              <span>{ formatDate(show.first_air_date) }</span>
              <label>RELEASED</label>
            </div>
          </div>
        </div>

        <p className='overview'>{ show.overview }</p>

        <div className='prompts'>
          <div className='prompt-group' onClick={ this.changePropHandler('favorite') }>
            <label>FAVORITE?</label>
            <span className={ `prop ${favorite ? 'true' : ''}` }><i className='fa fa-star'></i></span>
          </div>

          <div className='prompt-group' onClick={ this.changePropHandler('isPrivate') }>
            <label>PRIVATE?</label>
            <span className={ `prop ${isPrivate ? 'true' : ''}` }><i className='fa fa-lock'></i></span>
          </div>
        </div>

        <div className='lists'>
          <label>PICK A LIST</label>

          <ul>
          { listNames.map((listName, i) =>
            <li key={ i } onClick={ this.changeListHandler(listName) }>
              <span>{ listName }</span>
              <span className={ `check ${listName === list ? 'visible' : 'hidden'}` }><i className='fa fa-check'></i></span>
            </li> ) }
          </ul>
        </div>

        <Button onClick={ this.saveHandler } className='save'>{ showItemId ? 'SAVE' : 'ADD' }</Button>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(Show)
