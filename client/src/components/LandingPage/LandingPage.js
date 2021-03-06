import React, { Component } from 'react'
import { connect } from 'react-redux'

// styles
import './LandingPage.scss'

// components
import Button from '../Button/Button'
import Input from '../Input/Input'

// mappers
import { mapDispatch } from '../../mappers/user.mapper'

class LandingPage extends Component {
  state = {
    loginShown: false,
    email: '',
    password: '',
    name: ''
  }

  showLogin = (ev) => {
    this.setState({ loginShown: true })
  }

  handleChange = (name) => (ev) => {
    this.setState({ [name]: ev.target.value })
  }

  handleLogin = (ev) => {
    ev.preventDefault()

    const { attemptLogIn, history, setMsg } = this.props
    const { email, password } = this.state

    attemptLogIn(email, password)
      .then(() => history.push('/search'))
      .then(() => setMsg('Welcome!'))
      .catch(err => setMsg(err.message))
  }

  handleRegister = (ev) => {
    ev.preventDefault()

    const { attemptRegister, history, setMsg } = this.props
    const { name, email, password } = this.state

    attemptRegister(name, email, password)
      .then(() => history.push('/search'))
      .then(() => setMsg('Welcome!'))
      .catch(err => setMsg(err.message))
  }

  render = () => {
    return (
      <div className='LandingPage'>
        <h1>GOOD SHOWS</h1>

      { !this.state.loginShown ?
        <div className='content'>
          <p>
            With great streaming sites like Hulu, Netflix, and HBO, it can be difficult to keep separate “watch list” for each one.
          </p>

          <p>
            GOODSHOWS gives you one place manage your watchlist, and lets your friends know what you’re watching.
          </p>

          <Button onClick={ this.showLogin }>LOG IN OR SIGN UP</Button>
        </div>
          :
        <div className='content login'>
          <form onSubmit={ this.handleLogin }>
            <Input
              value={ this.state.email }
              type='email'
              onChange={ this.handleChange('email') }
              placeholder='EMAIL'
              required />
            <Input
              value={ this.state.password }
              type='password'
              onChange={ this.handleChange('password') }
              placeholder='PASSWORD'
              required />
            <Button>LOG IN</Button>
          </form>

          <form onSubmit={ this.handleRegister }>
            <Input
              value={ this.state.name }
              onChange={ this.handleChange('name') }
              className='name'
              placeholder='NAME'
              required />
            <Button>SIGN UP!</Button>
          </form>
        </div> }
      </div>
    )
  }
}

export default connect(null, mapDispatch)(LandingPage)
