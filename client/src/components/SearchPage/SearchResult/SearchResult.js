import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// styles
import './SearchResult.scss'

// components
import ShowPreview from '../../ShowPreview/ShowPreview'
import ShareButton from '../../ShareButton/ShareButton'

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
    const showProps = { name, poster_path, overview }

    return (
      <div className='SearchResult'>
        <ShowPreview { ...showProps }>
          <div className='buttons'>
            <ShareButton tmdbId={id} />
            <Link to={ `/show/${id}` }>
            { inList ?
              <span className='check'><i key={ 1 } className='fa fa-check'></i></span> :
              <span><i key={ 2 } className='fa fa-plus'></i></span> }
            </Link>
          </div>
        </ShowPreview>
      </div>
    )
  }
}

export default connect(mapState)(SearchResult)