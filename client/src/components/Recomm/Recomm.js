import React, { Component } from 'react'
import { connect } from 'react-redux'

// styles
import './Recomm.scss'
import '../FriendsPage/Friend/Friend.scss'

// mappers
import { mapState, mapDispatch } from '../../mappers/recomm.mapper'

// components
import ShowPreview from '../ShowPreview/ShowPreview'
import TopBar from '../TopBar/TopBar'
import Input from '../Input/Input'
import FriendInfo from '../FriendInfo/FriendInfo'
import Button from '../Button/Button'

class Recomm extends Component {
  state = {
    open: false,
    friendIds: {}
  }

  componentWillReceiveProps = nextProps => {
    const { open, friendIds } = nextProps

    if (open) {
      document.addEventListener('click', this.handleClick)
      document.addEventListener('touchend', this.handleClick)
      document.querySelector('body').classList.add('recomm-open')

      this.setState({ open: true, friendIds })
    }
    else if (open === false) {
      this.close()
    }
  }

  handleClick = ev => {
    if (!this.inner.contains(ev.target)) {
      this.close()
      
      this.props.closeRecomm()
    }
  }

  close = () => {
    document.removeEventListener('click', this.handleClick)
    document.removeEventListener('touchend', this.handleClick)
    document.querySelector('body').classList.remove('recomm-open')

    this.setState({ open: false, friendIds: {} })
  }

  toggleFriend = id => ev => {
    const { friendIds } = this.state

    friendIds[id] = !friendIds[id]
    this.setState({ friendIds })
  }

  handleSend = (tmdbId, name) => ev => {
    const { friendIds } = this.state

    const sendTo = Object.keys(friendIds).filter(id => friendIds[id] === true)
    this.props.makeRecomms({ tmdbId, name }, sendTo)
  }

  render = () => {
    const { open, friendIds } = this.state
    const { show, friends } = this.props
    const { id, name, poster_path, overview } = show
    const showProps = { name, poster_path, overview }

    return (
      <div className={ `Recomm ${open ? 'open' : ''}` }>
        <div className='overlay'></div>

        <div className='inner' ref={ inner => this.inner = inner }>
          <TopBar label='RECOMMEND' />
          <Button onClick={ this.handleSend(id, name) }>SEND</Button>

          <div className='content'>
            <ShowPreview { ...showProps }>
              
            </ShowPreview>

            <Input
              placeholder='SEARCH FRIENDS'
            />

            <div className='friend-list'>
            { friends.map(friend =>
              <div className='Friend' key={ friend.id }>
                <FriendInfo { ...friend } />

                <div className='action'>
                  <a
                    onClick={ this.toggleFriend(friend.id) }
                    className={ `${friendIds[friend.id] ? 'selected' : ''}` }
                  >
                    <i className='fa fa-check'></i>
                  </a>
                </div>
              </div> )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(Recomm)