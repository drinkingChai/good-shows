import React from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'
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
        <NavLink to='/search' activeClassName='active'><h3>Search</h3></NavLink>
        <NavLink to='/friends' activeClassName='active'><h3>Friends</h3></NavLink>
        <NavLink to='/account' activeClassName='active'><h3>Account</h3></NavLink>
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
export default withRouter(connect(null, mapDispatch)(Nav));
