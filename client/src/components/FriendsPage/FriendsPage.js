import React, { Component } from 'react'
import { connect } from 'react-redux'

// styles
import './FriendsPage.scss'

// components
import Input from '../Input/Input'
import Tabs from '../Tabs/Tabs'

// mappers
import { mapDispatch } from '../../mappers/friends.mapper'

class FriendsPage extends Component {
  state = {
    input: '',
    interval: null,
    friends: [],
    requests: [],
    activeList: 'friends'
  }

  handleSearch = (ev) => {
    let { interval } = this.state
    const { value } = ev.target

    clearInterval(interval)

    if (value) {
      interval = setInterval(() => {
        let _interval = this.state.interval
        const { input } = this.state

        clearInterval(_interval)

        this.props.searchFriends(input)
      }, 500)
    }

    this.setState({ input: value, interval })
  }

  setActiveList = (listName) => (ev) => {
    this.setState({ activeList: listName })
  }

  render = () => {
    const { input, activeList } = this.state

    return (
      <div className='FriendsPage'>
        <Input
          value={ input }
          onChange={ this.handleSearch }
          placeholder='SEARCH FRIENDS OR ADD' />

        <Tabs
          items={ [{ stateName: 'friends', label: 'FRIENDS' }, { stateName: 'requests', label: 'REQUESTS' }] }
          setActiveList={ this.setActiveList }
          activeList={ activeList } />


      </div>
    )
  }
}

export default connect(null, mapDispatch)(FriendsPage)