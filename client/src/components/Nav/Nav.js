import React, { Component } from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import './Nav.css'
import { signOut } from '../../reducers/currentUser'
import { connect } from 'react-redux'
import { mapState } from '../../mappers/user'
import DefaultIcon from '../../images/default-icon.png'

class Nav extends Component {
  state ={ ddOpen: false }

  toggleDD = () => {
    this.setState({ ddOpen: !this.state.ddOpen }, () => {
      if (this.state.ddOpen) {
        document.addEventListener('click', this.clickHandler)
      } else {
        document.removeEventListener('click', this.clickHandler)
      }
    })
  }

  clickHandler = (ev) => {
    if (!this || !this.node.contains(ev.target)) {
      document.removeEventListener('click', this.clickHandler)
      this.setState({ ddOpen: false })
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.clickHandler)
  }

  render = () => {
    return (
      <nav className='Nav'>
        <div>
          <Link to='/'><h3 className='logo'>good<span>shows</span></h3></Link>
        </div>

        <div className='links'>
          <NavLink to='/search' activeClassName='active'><h3>Search</h3></NavLink>
          <NavLink to='/friends' activeClassName='active'><h3>Friends</h3></NavLink>
          <NavLink to='/account' activeClassName='active'>
            <h3>{ this.props.user.name.split(' ')[0] }</h3>
            <div className='image'>
              <img src={ this.props.user.profileImage || DefaultIcon } alt='profile' />
            </div>
          </NavLink>
          <div className='dd-arrow' onClick={ this.toggleDD }></div>
        </div>

        <div className={ `dd ${this.state.ddOpen ? 'open' : 'closed'}` } ref={ node => this.node = node }>
          <a onClick={ this.props.signUserOut }><h3>Log Out</h3></a>
        </div>
      </nav>
    )
  }
}

const mapDispatch = dispatch => ({
  signUserOut() {
    dispatch(signOut())
  }
})
export default withRouter(connect(mapState, mapDispatch)(Nav));
