import React from 'react'

// styes
import './TopBar.scss'

const TopBar = ({ label }) => {
  return (
    <div className='TopBar'>{ label }</div>
  )
}

export default TopBar