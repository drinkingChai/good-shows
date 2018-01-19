import React from 'react'
import './Stats.css'
import { connect } from 'react-redux'
import { mapState } from '../UserInfoMapper'
import defaultIcon from '../../../profileImages/default-icon.png'
import { Link } from 'react-router-dom'

const Stats = ({ user }) => {
  let currentlyWatching = user.shows.filter(show => show.list === 'watching')
  let wantToWatch = user.shows.filter(show => show.list === 'wantToWatch')

  return (
    <div className='Stats'>
      <div className='profile-image'>
        <img src={ user.profilePicture || defaultIcon } alt='profile-pic' />
      </div>

      <div className='user-info'>
        <h5>Logged in as:</h5>
        <p className='user-name'>{ user.name }</p>
        <p>Currently Watching: { currentlyWatching.length }</p>
        <p>Want to Watch: { wantToWatch.length }</p>
      </div>

      <div className='stats-footer'>
        <Link to='/account'>Edit Profile</Link>
      </div>
    </div>
  )
}

export default connect(mapState)(Stats)
