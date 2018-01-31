import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

// styles
import './NavBar.scss'

// links
let links = [
  { path: '/search', icon: 'fas fa-search', label: 'Search' },
  { path: '/friends', icon: 'fas fa-users', label: 'Friends' },
  { path: '/list', icon: 'fas fa-list-ul', label: 'List' },
  { path: '/profile', icon: 'fas fa-user', label: 'Profile' }
]

const NavBar = (props) => {
  return (
    <nav className='NavBar'>
    { links.map((link, i) =>
      <NavLink
        to={ link.path }
        key={ i }
        activeClassName='active'
      >
        <span><i className={ link.icon }></i></span>
        <label>{ link.label }</label>
      </NavLink> )}
    </nav>
  )
}

export default withRouter(NavBar)