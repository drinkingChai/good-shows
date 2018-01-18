import React, { Component } from 'react'
import './LoginForm.css'
import Button from '../Button/Button'
import Input from '../Input/Input'

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  }

  render = () => {
    return (
      <div className='LoginForm'>
        <form className='login'>
          <Input placeholder='Email' type='email' />
          <Input placeholder='Password' type='password' />
          <Button label='Log In' />
        </form>

        <form>
          <Input placeholder='Name' />
          <Button label='Create Account' />
        </form>
      </div>
    )
  }
}

export default LoginForm
