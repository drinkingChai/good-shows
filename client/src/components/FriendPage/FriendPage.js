import React, { Component } from 'react'
import { connect } from 'react-redux'

// styles
import './FriendPage.scss'
import '../FriendsPage/Friend/Friend.scss'

// mappers
import { mapState, mapDispatch } from '../../mappers/friend.mapper'

// components
import Tabs from '../Tabs/Tabs'
import FriendInfo from '../FriendInfo/FriendInfo'
import BackButton from '../BackButton/BackButton'

class FriendPage extends Component {
  state = {
    activeList: 'toWatch',
    favorites: [],
    watched: [],
    toWatch: []
  }

  componentWillReceiveProps = nextProps => {
    const { favorites, toWatch, watched } = nextProps
    this.setState({ favorites, toWatch, watched })
  }

  componentDidMount = () => {
    const { getShows, match } = this.props
    getShows(match.params.friendId)
  }

  setActiveList = listName => ev => {
    this.setState({ activeList: listName, input: '' })
  }

  render = () => {
    const { activeList } = this.state
    const { friend } = this.props
    const { id, name, email } = friend
    const friendProps = { id, name, email }
    const showList = this.state[activeList]

    const tabItems = [
      { stateName: 'toWatch', label: 'TO WATCH' },
      { stateName: 'watched', label: 'WATCHED' },
      { stateName: 'favorites', label: 'FAVORITES' }
    ]

    return (
      <div className='FriendPage'>
        <BackButton />

        <FriendInfo { ...friendProps } />

        <Tabs
          items={ tabItems }
          setActiveList={ this.setActiveList }
          activeList={ activeList } />
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(FriendPage)