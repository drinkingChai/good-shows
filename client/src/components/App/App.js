import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
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

  // skew fall away transitions

  render() {
    return (
      <div className="App">
        { /* this.props.token ?
          <Main /> :
          <Landing /> */ }
      </div>
    );
  }
}

export default withRouter(connect(mapState, mapDispatch)(App));
