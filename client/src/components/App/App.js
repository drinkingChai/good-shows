import React, { Component } from 'react';
import './App.css';
import Landing from '../Landing/Landing'
import { connect } from 'react-redux'
import { verifyClientToken, signOut } from '../../reducers/currentUser'
import Main from '../Main/Main'
import { withRouter } from 'react-router-dom'
import Footer from '../Footer/Footer'
import '../../fonts/themify-icons/themify-icons.css'

class App extends Component {
  componentDidMount = () => {
    if (localStorage['token']) {
      this.props.checkToken(localStorage['token'])
        .catch(err => this.props.signUserOut())
    }
  }

  render() {
    return (
      <div className="App">
        { this.props.token ?
          <Main /> :
          <Landing /> }
        <Footer />
      </div>
    );
  }
}

const mapState = ({ currentUser }) => ({
  token: currentUser.token
})
const mapDispatch = dispatch => ({
  checkToken(token) {
    return dispatch(verifyClientToken(token))
  },
  signUserOut() {
    dispatch(signOut())
  }
})
export default withRouter(connect(mapState, mapDispatch)(App));
