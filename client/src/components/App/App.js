import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// styles
import './App.scss';
import '../../fonts/themify-icons/themify-icons.css'

// mappers
import { mapState, mapDispatch } from '../../mappers/user.mapper'

// components
import GuestRouter from '../Routers/GuestRouter'
import UserRouter from '../Routers/UserRouter'
import Message from '../Message/Message'

class App extends Component {
  componentDidMount = () => {
    if (localStorage['token']) {
      this.props.attemptLoadWithToken(localStorage['token'])
        .catch(err => this.props.signUserOut())
    }
  }

  render() {
    return (
      <div className="App">
        <Message />
        
      { !this.props.token ?
        <GuestRouter /> :
        <UserRouter /> }
      </div>
    );
  }
}

export default withRouter(connect(mapState, mapDispatch)(App));
