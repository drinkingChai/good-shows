import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Nav from '../Nav/Nav'
import Account from '../Account/Account'
import './Main.css'

export default function (props) {
  return (
    <div className='Main'>
      <Nav />

      <div className='switch'>
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route exact path='/account' component={ Account } />
        </Switch>
      </div>
    </div>
  )
}
