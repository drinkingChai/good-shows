import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

// styles
import './NavBar.css'

// links
let links = [
  { path: '/', icon: 'fas fa-search' },
  { path: '/friends', icon: 'fas fa-users' },
  { path: '/list', icon: 'fas fa-list-ul' },
  { path: '/profile', icon: 'fas fa-user' }
]

const NavBar = (props) => {
  return (
    <nav className='NavBar'>
    { links.map((link, i) =>
      <NavLink
        to={ link.path }
        key={ i }
        activeClassName='active'
      ><i className={ link.icon }></i></NavLink> )}
    </nav>
  )
}

export default withRouter(NavBar)