import React, { Component } from 'react'
import './LoginForm.css'
import Button from '../Button/Button'
import Input from '../Input/Input'
import ErrorPane from '../ErrorPane/ErrorPane'
import { connect } from 'react-redux'
import { axiosErrorParser } from '../../utils'
import { mapDispatch } from '../../mappers/user'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    errorStr: '',
    errorState: false
  }

  handleChange = (name) => (ev) => {
    this.setState({ [name]: ev.target.value, errorState: false })
  }

  handleLogIn = (ev) => {
    ev.preventDefault()
    this.props.attemptLogIn(this.state.email, this.state.password)
      .catch(err => this.setState({ errorStr: axiosErrorParser(err), errorState: true }))
  }

  handleRegister = (ev) => {
    ev.preventDefault()
    const { name, email, password } = this.state
    this.props.attemptRegister(name, email, password)
      .catch(err => this.setState({ errorStr: axiosErrorParser(err), errorState: true }))
  }

  render = () => {
    return (
      <div className='LoginForm'>
        <h3>Log In or Sign Up</h3>
        <form className='login' onSubmit={ this.handleLogIn }>
          <Input placeholder='Email' type='email' value={ this.state.email } onChange={ this.handleChange('email') } />
          <Input placeholder='Password' type='password' value={ this.state.password } onChange={ this.handleChange('password') } />
          <Button label='Log In' />
        </form>

        <form onSubmit={ this.handleRegister }>
          <Input placeholder='Name' value={ this.state.name } onChange={ this.handleChange('name') } />
          <Button label='Create Account' />
        </form>

        <ErrorPane visibility={ this.state.errorState }>
          <p>{ this.state.errorStr }</p>
        </ErrorPane>
      </div>
    )
  }
}

export default connect(null, mapDispatch)(LoginForm)
