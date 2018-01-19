import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Nav from '../Nav/Nav'
import './Main.css'

export default function (props) {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path='/' component={ Home } />
      </Switch>
    </div>
  )
}
