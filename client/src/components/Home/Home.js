import React, { Component } from 'react'
import UserPane from '../UserPane/UserPane'
import './Home.css'

class Home extends Component {
  render = () => {
    return (
      <div className='Home'>
        <UserPane />
      </div>
    )
  }
}

export default Home
