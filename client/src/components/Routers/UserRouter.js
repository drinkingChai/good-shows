import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

// components
import TopBar from '../TopBar/TopBar'
import NavBar from '../NavBar/NavBar'
import Recomm from '../Recomm/Recomm'

// pages
import SearchPage from '../SearchPage/SearchPage'
import ShowPage from '../ShowPage/ShowPage'
import ProfilePage from '../ProfilePage/ProfilePage'
import ListPage from '../ListPage/ListPage'
import FriendsPage from '../FriendsPage/FriendsPage'
import FriendPage from '../FriendPage/FriendPage'

// styles
import './Main.scss'

class Main extends Component {
  render = () => {
    return (
      <div>
        <TopBar label='GOOD SHOWS' />

        <div className='Main'>
          <Switch>
            <Route path='/search' component={ SearchPage } />
            <Route exact path='/show/:tmdbId' component={ ShowPage } />
            <Route exact path='/profile' component={ ProfilePage } />
            <Route exact path='/list' component={ ListPage } />
            <Route exact path='/friends' component={ FriendsPage } />
            <Route exact path='/friends/:friendId' component={ FriendPage } />
          </Switch>
        </div>
        
        <NavBar />

        <Recomm />
      </div>
    )
  }
}

export default Main