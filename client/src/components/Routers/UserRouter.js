import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

// components
import Search from '../Search/Search'
import TopBar from '../TopBar/TopBar'
import NavBar from '../NavBar/NavBar'
import ShowAddEdit from '../ShowAddEdit/ShowAddEdit'

// styles
import './Main.css'

class Main extends Component {
  render = () => {
    return (
      <div>
        <TopBar />

        <div className='Main'>
          <Switch>
            <Route path='/search' component={ Search } />
            <Route exact path='/show/:id' component={ ShowAddEdit } />
          </Switch>
        </div>
        
        <NavBar />
      </div>
    )
  }
}

export default Main