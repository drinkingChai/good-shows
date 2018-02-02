import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// styles
import './SearchResult.scss'

// components
import Poster from '../../Poster/Poster'

// mappers
import { mapState } from '../../../mappers/show.mapper'

class SearchResult extends Component {
  state = {
    poster_path: '',
    overview: '',
    name: '',
    id: '',
    inList: false
  }

  componentWillReceiveProps = nextProps => {
    const { userShowIds, result } = nextProps
    const inList = userShowIds && userShowIds[result.id]
    this.setState({ ...result, inList })
  }

  componentDidMount = () => {
    const { userShowIds, result } = this.props
    const inList = userShowIds && userShowIds[result.id]
    this.setState({ ...result, inList })
  }

  render = () => {
    const { id, name, poster_path, overview, inList } = this.state

    return (
      <div className='SearchResult'>
        <Poster src={ poster_path } size={ 185 } />

        <section>
          <h4 className='title'>{ name }</h4>
          <p className='overview'>{ overview.length > 125 ? overview.slice(0, 125) + '...' : overview }</p>
          <div className='buttons'>
            <a><i className='fa fa-share'></i></a>
            <Link to={ `/show/${id}` }>
            { inList ?
              <span className='check'><i className='fa fa-check'></i></span> :
              <span><i className='fa fa-plus'></i></span> }
            </Link>
          </div>
        </section>
      </div>
    )
  }
}

export default connect(mapState)(SearchResult)