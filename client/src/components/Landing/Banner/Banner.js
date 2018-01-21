import React, { Component } from 'react'
import './Banner.css'
import { withButtonProps } from '../../Button/Button'
import Modal from '../../Modal/Modal'
import LoginForm from '../../LoginForm/LoginForm'

const ShowLoginButton = withButtonProps('Log In or Sign Up')

export default class Baner extends Component {
  state = { modalOpen: false }

  showLogin = () => {
    this.setState({ modalOpen: true })
  }

  render = () => {
    return (
      <div className='Banner'>
        <Modal open={ this.state.modalOpen } >
          <LoginForm />
        </Modal>

        <div className='content'>
          <h1>good<span>shows</span></h1>
          <p>alpha</p>

          <div>
            <ShowLoginButton onClick={ this.showLogin } />
          </div>
        </div>
      </div>
    ) 
  }
}
