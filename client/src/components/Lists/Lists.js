import React from 'react'
import './Lists.css'

export default function ({ lists, noNums, onClick }) {
  return (
    <div className='Lists'>
      { lists && lists.map(list =>
          <li key={ list._id } onClick={ () => onClick(list) }>
            <p>{ list.name }</p>
            { !noNums && <p className='count'>{ list.shows.length }</p> }
          </li>
      )}
    </div>
  )
}
