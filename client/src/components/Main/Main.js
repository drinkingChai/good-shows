import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home/Home'
import Nav from '../Nav/Nav'
import AddEditShow from '../AddEditShow/AddEditShow'
import SearchShow from '../SearchShow/SearchShow'
import Account from '../Account/Account'
import './Main.css'

class Main extends Component {
  render = () => {
    return (
      <div className='Main'>
        <Nav />

        <div className='switch'>
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/show/:tmdbId' component={ AddEditShow } />
            <Route exact path='/account' component={ Account } />
            <Route exact path='/lists' component={ SearchShow } />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Main
