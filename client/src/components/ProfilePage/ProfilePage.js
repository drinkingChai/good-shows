import React, { Component } from 'react'
import { connect } from 'react-redux'

// styles
import './ProfilePage.scss'

// mappers
import { mapDispatch } from '../../mappers/user.mapper'

class ProfilePage extends Component {
  handleSignOut = () => {
    this.props.signUserOut()
    this.props.history.push('/')
  }
  render = () => {
    return (
      <div className='ProfilePage'>
        <a onClick={ this.handleSignOut }>Sign Out</a>
      </div>
    )
  }
}

export default connect(null, mapDispatch)(ProfilePage)