import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

// components
import TopBar from '../TopBar/TopBar'
import NavBar from '../NavBar/NavBar'

// pages
import Search from '../Search/Search'
import Show from '../Show/Show'
import ProfilePage from '../ProfilePage/ProfilePage'

// styles
import './Main.scss'

class Main extends Component {
  render = () => {
    return (
      <div>
        <TopBar />

        <div className='Main'>
          <Switch>
            <Route path='/search' component={ Search } />
            <Route exact path='/show/:tmdbId' component={ Show } />
            <Route exact path='/profile' component={ ProfilePage } />
          </Switch>
        </div>
        
        <NavBar />
      </div>
    )
  }
}

export default Main