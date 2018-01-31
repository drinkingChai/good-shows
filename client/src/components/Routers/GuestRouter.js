import React from 'react'
import { Switch, Route } from 'react-router-dom'

// pages
import LandingPage from '../LandingPage/LandingPage'

export default function () {
  return (
    <Switch>
      <Route exact path='/' component={LandingPage} />
    </Switch>
  )
}