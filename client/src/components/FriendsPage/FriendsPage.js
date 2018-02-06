import React, { Component } from 'react'
import { connect } from 'react-redux'

// styles
import './FriendsPage.scss'

// components
import Input from '../Input/Input'
import Tabs from '../Tabs/Tabs'
import Friend from './Friend/Friend'

// mappers
import { mapState, mapDispatch } from '../../mappers/friends.mapper'

class FriendsPage extends Component {
  state = {
    input: '',
    interval: null,
    friends: [],
    requests: [],
    friendSearch: [],
    activeList: 'friends'
  }

  componentWillReceiveProps = nextProps => {
    const { friendSearch, friends, requests } = nextProps
    this.setState({ friendSearch, friends, requests })
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

      this.setState({ input: value, interval, activeList: 'friendSearch' })
    } else {
      this.setState({ input: value, activeList: 'friends' })
    }
  }

  setActiveList = (listName) => (ev) => {
    this.setState({ activeList: listName })
  }

  render = () => {
    const { input, activeList } = this.state
    const friendList = this.state[activeList]

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

        { friendList.map((user, i) => 
          <Friend key={ i } { ...user } /> )}
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(FriendsPage)