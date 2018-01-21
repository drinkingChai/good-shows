import React from 'react'
import './Banner.css'
import Button from '../../Button/Button'

export default function () {
  return (
    <div className='Banner'>
      <div>
        <h1>good<span>shows</span></h1>
        <p>alpha</p>

        <div>
          <Button label='Log In or Sign Up' />
        </div>
      </div>
    </div>
  ) 
}
