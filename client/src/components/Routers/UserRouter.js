import React from 'react'
import { Switch, Route } from 'react-router-dom'

// components
import Search from '../Search/Search'
import TopBar from '../TopBar/TopBar'
import NavBar from '../NavBar/NavBar'

// styles
import './Main.css'

export default function () {
  return (
    <main className='Main'>
      <TopBar />

      <Switch>
        <Route exact path='/' component={ Search } />
      </Switch>
      
      <NavBar />
    </main>
  )
}