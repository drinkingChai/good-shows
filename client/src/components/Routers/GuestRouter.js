import React from 'react'
import { Switch, Route } from 'react-router-dom'

// components
import LandingPage from '../LandingPage/LandingPage'

export default function () {
  return (
    <Switch>
      <Route exact path='/' component={LandingPage} />
    </Switch>
  )
}
