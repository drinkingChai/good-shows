import React, { Component } from 'react'
import './Blurb.css'
import { withButtonProps } from '../../Button/Button'
import Modal from '../../Modal/Modal'
import LoginForm from '../../LoginForm/LoginForm'

const ShowLoginButton = withButtonProps('Log In or Sign Up')

class Blurb extends Component {
  state = { modalOpen: false }

  showLogin = () => {
    this.setState({ modalOpen: true })
  }

  render = () => {
    return (
      <div className='Blurb'>
        <Modal open={ this.state.modalOpen } >
          {/* temp - to go to login server instead */}
          <LoginForm />
        </Modal>

        <div className='inner'>
          <h3>Find Your Next Show</h3>
          <div>
            <p>With great streaming sites like Hulu, Netflix, and HBO,</p>
            <p>it can be difficult to keep separate “watch list” for each one.</p>
            <br/>
            <p>good<span>Shows</span> gives you one place manage your watchlist,</p>
            <p>and lets your friends know what you’re watching.</p>
          </div>
          <p>Sign up or log in to get started.</p>

          <ShowLoginButton onClick={ this.showLogin } />
        </div>
      </div>
    )
  }
}

export default Blurb
