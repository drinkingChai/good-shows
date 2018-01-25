import React, { Component } from 'react';
import './App.css';
import Landing from '../Landing/Landing'
import { connect } from 'react-redux'
import Main from '../Main/Main'
import { withRouter } from 'react-router-dom'
import '../../fonts/themify-icons/themify-icons.css'
import { mapState, mapDispatch } from '../../mappers/user'

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
        { this.props.token ?
          <Main /> :
          <Landing /> }
      </div>
    );
  }
}

export default withRouter(connect(mapState, mapDispatch)(App));
