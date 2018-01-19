import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import { signOut } from '../../reducers/currentUser'
import { connect } from 'react-redux'

const Nav = (props) => {
  return (
    <nav className='Nav'>
      <div>
        <Link to='/'><h3 className='logo'>good<span>shows</span></h3></Link>
      </div>

      <div className='links'>
        <Link to='/search'><h3>Search</h3></Link>
        <Link to='/friends'><h3>Friends</h3></Link>
        <Link to='/account'><h3>Account</h3></Link>
        <a onClick={ props.signUserOut }><h3>Log Out</h3></a>
      </div>
    </nav>
  )
}

const mapDispatch = dispatch => ({
  signUserOut() {
    dispatch(signOut())
  }
})
export default connect(null, mapDispatch)(Nav);
