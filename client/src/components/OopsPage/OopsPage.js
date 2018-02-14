import React from 'react'
import { withRouter } from 'react-router-dom'

// styles
import './OopsPage.scss'

// components
import Button from '../Button/Button'

const OopsPage = ({ history }) => {
  return (
    <div className='OopsPage'>
      <h1>404</h1>
      <p>Something went wrong!</p>
      <Button onClick={ history.goBack }>GO BACK</Button>
    </div>
  )
}

export default withRouter(OopsPage)