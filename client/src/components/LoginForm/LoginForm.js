import React, { Component } from 'react'
import './LoginForm.css'
import Button from '../Button/Button'
import Input from '../Input/Input'
import { connect } from 'react-redux'
import { signIn, regAndSignIn } from '../../reducers/currentUser'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    name: ''
  }

  handleChange = (name) => (ev) => {
    this.setState({ [name]: ev.target.value })
  }

  handleLogIn = (ev) => {
    ev.preventDefault()
    this.props.attemptLogIn(this.state.email, this.state.password)
  }

  handleRegister = (ev) => {
    ev.preventDefault()
    const { name, email, password } = this.state
    this.props.attemptRegister(name, email, password)
  }

  render = () => {
    return (
      <div className='LoginForm'>
        <form className='login' onSubmit={ this.handleLogIn }>
          <Input placeholder='Email' type='email' value={ this.state.email } onChange={ this.handleChange('email') } />
          <Input placeholder='Password' type='password' value={ this.state.password } onChange={ this.handleChange('password') } />
          <Button label='Log In' />
        </form>

        <form onSubmit={ this.handleRegister }>
          <Input placeholder='Name' value={ this.state.name } onChange={ this.handleChange('name') } />
          <Button label='Create Account' />
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  attemptLogIn(email, password) {
    dispatch(signIn(email, password))
  },
  attemptRegister(name, email, password) {
    dispatch(regAndSignIn(name, email, password))
  }
})
export default connect(null, mapDispatch)(LoginForm)
