import React, { Component } from 'react'
import './LoginForm.css'
import Button from '../Button/Button'
import Input from '../Input/Input'
import ErrorPane from '../ErrorPane/ErrorPane'
import { connect } from 'react-redux'
import { signIn, regAndSignIn } from '../../reducers/currentUser'
import { axiosErrorParser } from '../../utils'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    errorStr: ''
  }

  handleChange = (name) => (ev) => {
    this.setState({ [name]: ev.target.value })
  }

  handleLogIn = (ev) => {
    ev.preventDefault()
    this.props.attemptLogIn(this.state.email, this.state.password)
      .catch(err => this.setState({ errorStr: axiosErrorParser(err) }))
  }

  handleRegister = (ev) => {
    ev.preventDefault()
    const { name, email, password } = this.state
    this.props.attemptRegister(name, email, password)
      .catch(err => this.setState({ errorStr: axiosErrorParser(err) }))
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

        <ErrorPane visibility={ this.state.errorStr }>
          <p>{ this.state.errorStr }</p>
        </ErrorPane>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  attemptLogIn(email, password) {
    return dispatch(signIn(email, password))
  },
  attemptRegister(name, email, password) {
    return dispatch(regAndSignIn(name, email, password))
  }
})
export default connect(null, mapDispatch)(LoginForm)
