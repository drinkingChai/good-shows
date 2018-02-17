import React from 'react'
import { connect } from 'react-redux'

// styles
import './ShareButton.scss'

// relies on recomm reducer
import { mapDispatch } from '../../mappers/recomm.mapper'

const ShareButton = ({ openRecomm, tmdbId }) =>
  <a onClick={ () => openRecomm(tmdbId) } className='ShareButton'><i className='fa fa-share'></i></a>

export default connect(null, mapDispatch)(ShareButton)