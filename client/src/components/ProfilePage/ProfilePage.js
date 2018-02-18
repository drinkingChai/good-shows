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
    currentpass: '',
    newpass: ''
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
    const { attemptUpdate, setMsg } = this.props

    attemptUpdate({ name, email })
      .then(() => setMsg('Updated!'))
      .catch(err => setMsg(err.message))
  }

  handlePasswordChange = ev => {
    ev.preventDefault()

    const { currentpass, newpass } = this.state
    const { attemptPasswordChange, setMsg } = this.props

    attemptPasswordChange(currentpass, newpass)
      .then(() => setMsg('Password changed!'))
      .catch(err => setMsg(err.message))
  }

  render = () => {
    const { name, email, newpass, currentpass } = this.state
    const { user } = this.props

    return (
      <div className='ProfilePage'>
        <SVGInline svg={ jdenticon.toSvg(user.id, 50) } />

        <form onSubmit={ this.handleUpdate }>
          <Input
            value={ name }
            onChange={ this.handleChange('name') }
            placeholder='NAME'
            required />

          <Input
            value={ email }
            onChange={ this.handleChange('email') }
            type='email'
            placeholder='EMAIL'
            required />

          <Button>UPDATE</Button>
        </form>

        <form onSubmit={ this.handlePasswordChange }>
          <Input
            value={ currentpass }
            onChange={ this.handleChange('currentpass') }
            type='password'
            placeholder='CURRENT PASSWORD'
            required />

          <Input
            value={ newpass }
            onChange={ this.handleChange('newpass') }
            type='password'
            placeholder='NEW PASSWORD'
            required />

          <Button>CHANGE PASSWORD</Button>
        </form>

        <Button onClick={ this.handleSignOut }>SIGN OUT</Button>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(ProfilePage)