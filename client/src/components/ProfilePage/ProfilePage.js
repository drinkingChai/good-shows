import React, { Component } from 'react'
import { connect } from 'react-redux'
import jdenticon from 'jdenticon'
import SVGInline from 'react-svg-inline'

// styles
import './ProfilePage.scss'

// components
import Input from '../Input/Input'
import Button from '../Button/Button'

// mappers
import { mapState, mapDispatch } from '../../mappers/user.mapper'

class ProfilePage extends Component {
  state = {
    name: '',
    email: '',
    newpassword: '',
    verifypassword: ''
  }

  componentWillReceiveProps = nextProps => {
    const { name, email } = nextProps.user
    this.setState({ name, email })
  }

  componentDidMount = () => {
    const { name, email } = this.props.user
    this.setState({ name, email })
  }

  handleSignOut = () => {
    this.props.signUserOut()
    this.props.history.push('/')
  }

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value })
  }

  handleUpdate = ev => {
    ev.preventDefault()

    const { name, email } = this.state

    this.props.attemptUpdate({ name, email })
  }

  handlePasswordChange = ev => {
    ev.preventDefault()

    const { newpassword, verifypassword } = this.state
    if (!newpassword || newpassword !== verifypassword) return // dispaly error message

    this.props.attemptPasswordChange(newpassword)
  }

  render = () => {
    const { name, email, newpassword, verifypassword } = this.state
    const { user } = this.props

    return (
      <div className='ProfilePage'>
        <SVGInline svg={ jdenticon.toSvg(user.id, 50) } />

        <form onSubmit={ this.handleUpdate }>
          <Input
            value={ name }
            onChange={ this.handleChange('name') }
            placeholder='NAME' />

          <Input
            value={ email }
            onChange={ this.handleChange('email') }
            type='email'
            placeholder='EMAIL' />

          <Button>UPDATE</Button>
        </form>

        <form onSubmit={ this.handlePasswordChange }>
          <Input
            value={ newpassword }
            onChange={ this.handleChange('newpassword') }
            type='password'
            placeholder='NEW PASSWORD' />

          <Input
            value={ verifypassword }
            onChange={ this.handleChange('verifypassword') }
            type='password'
            placeholder='VERIFY PASSWORD' />

          <Button>CHANGE PASSWORD</Button>
        </form>

        <Button onClick={ this.handleSignOut }>Sign Out</Button>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(ProfilePage)