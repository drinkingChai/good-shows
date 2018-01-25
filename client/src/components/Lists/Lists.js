import React from 'react'
import './Lists.css'

export default function ({ lists }) {
  return (
    <div className='Lists'>
      { lists && lists.map(list =>
          <li key={ list._id }>
            <p>{ list.name }</p>
            <p className='count'>{ list.shows.length }</p>
          </li>
      )}
    </div>
  )
}
