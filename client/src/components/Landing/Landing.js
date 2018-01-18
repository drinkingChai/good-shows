import React from 'react'
import './Landing.css'
import Trending from './Trending/Trending'
import Banner from './Banner/Banner'
import Blurb from './Blurb/Blurb'
import LoginForm from '../LoginForm/LoginForm'

export default function() {
  return (
    <div className='Landing'>
      <Banner />

      <div className="landing-content">
        <Trending />
        <Blurb />
        <LoginForm />
      </div>
    </div>
  )
}
