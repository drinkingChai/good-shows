import React from 'react'
import { Switch, Route } from 'react-router-dom'

// components
import Search from '../Search/Search'

export default function () {
  return (
    <Switch>
      <Route exact path='/' component={ Search } />
    </Switch>
  )
}