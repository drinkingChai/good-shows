import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// styles
import './ShowItem.scss'

// components
import Poster from '../../Poster/Poster'

// mappers
import { mapDispatch } from '../../../mappers/show.mapper'

class ShowItem extends Component {
  state = {
    show: { overview: '' },
    item: {}
  }

  componentWillReceiveProps = nextProps => {
    const { show, item } = nextProps
    this.setState({ show, item })
  }

  componentDidMount = () => {
    const { show, item } = this.props
    this.setState({ show, item })
  }

  makePrivateHandler = () => {
    const { item } = this.state
    item.isPrivate = !item.isPrivate
    this.props.updateShow(item.id, item)
  }

  addFavoriteHandler = () => {
    const { item } = this.state
    item.favorite = !item.favorite
    this.props.updateShow(item.id, item)
  }

  render = () => {
    const { item, show } = this.state

    return (
      <div className='ShowItem'>
        <Poster src={ show.poster_path } size={ 185 } />

        <section>
          <h4 className='title'>{ show.name }</h4>
          <p className='overview'>{ show.overview.length > 125 ? show.overview.slice(0, 125) + '...' : show.overview }</p>
          <div className='buttons'>
            <a onClick={ this.makePrivateHandler } className={ `${item.isPrivate ? 'true' : ''}` }><i className='fa fa-lock'></i></a>
            <a onClick={ this.addFavoriteHandler } className={ `${item.favorite ? 'true' : ''}` }><i className='fa fa-star'></i></a>
            <Link to={ `/show/${show.tmdbId}` }><i className='fa fa-ellipsis-h'></i></Link>
          </div>
        </section>
      </div>
    )
  }
}

export default connect(null, mapDispatch)(ShowItem)