import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

// components
import TopBar from '../TopBar/TopBar'
import NavBar from '../NavBar/NavBar'

// pages
import SearchPage from '../SearchPage/SearchPage'
import ShowPage from '../ShowPage/ShowPage'
import ProfilePage from '../ProfilePage/ProfilePage'
import ListPage from '../ListPage/ListPage'

// styles
import './Main.scss'

class Main extends Component {
  render = () => {
    return (
      <div>
        <TopBar />

        <div className='Main'>
          <Switch>
            <Route path='/search' component={ SearchPage } />
            <Route exact path='/show/:tmdbId' component={ ShowPage } />
            <Route exact path='/profile' component={ ProfilePage } />
            <Route exact path='/list' component={ ListPage } />
          </Switch>
        </div>
        
        <NavBar />
      </div>
    )
  }
}

export default Main