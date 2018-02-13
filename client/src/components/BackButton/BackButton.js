import React from 'react'
import { withRouter } from 'react-router-dom'

// styles
import './BackButton.scss'

const BackButton = ({ history }) =>
  <span className='BackButton' onClick={ history.goBack }><i className='fa fa-chevron-left'></i></span>

export default withRouter(BackButton)