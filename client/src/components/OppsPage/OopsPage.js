import React from 'react'

// styles
import './OopsPage.scss'

// components
import Button from '../Button/Button'

export default function () {
  return (
    <div className='OopsPage'>
      <h1>404</h1>
      <p>Something went wrong!</p>
      <Button>GO BACK</Button>
    </div>
  )
}