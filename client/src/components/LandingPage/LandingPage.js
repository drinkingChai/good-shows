import React, { Component } from 'react'

// styles
import './LandingPage.css'

// components
import Button from '../Button/Button'

class LandingPage extends Component {
  render = () => {
    return (
      <div className='LandingPage'>
        <h1>GOOD SHOWS</h1>

        <div className='content'>
          <p>
            With great streaming sites like Hulu, Netflix, and HBO, it can be difficult to keep separate “watch list” for each one.
          </p>

          <p>
            GOODSHOWS gives you one place manage your watchlist, and lets your friends know what you’re watching.
          </p>

          <Button>LOG IN OR SIGN UP</Button>
        </div>
      </div>
    )
  }
}

export default LandingPage
