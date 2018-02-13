import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// styles
import './ShowItem.scss'
import '../../SearchPage/SearchResult/SearchResult.scss'

// components
import ShowPreview from '../../ShowPreview/ShowPreview'

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
    const { poster_path, name, overview } = show
    const showProps = { poster_path, name, overview }

    return (
      <div className='ShowItem SearchResult'>
        <ShowPreview { ...showProps }>
          <div className='buttons'>
            <a onClick={ this.makePrivateHandler } className={ `${item.isPrivate ? 'true' : ''}` }><i className='fa fa-lock'></i></a>
            <a onClick={ this.addFavoriteHandler } className={ `${item.favorite ? 'true' : ''}` }><i className='fa fa-star'></i></a>
            <Link to={ `/show/${show.tmdbId}` }><i className='fa fa-ellipsis-h'></i></Link>
          </div>
        </ShowPreview>
      </div>
    )
  }
}

export default connect(null, mapDispatch)(ShowItem)
