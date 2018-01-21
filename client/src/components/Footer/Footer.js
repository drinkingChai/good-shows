import React from 'react'
import './Footer.css'
import tmdb from '../../images/tmdb.png'

export default function () {
  return (
    <footer className='Footer'>
      <div className='left'>
        <img src={ tmdb } alt='tmdb' />
        <div>
          <p>good<span>shows</span> is an open source project.</p>
          <p>It leverages the TMDB API.</p>
        </div>
      </div>

      <a href='https://github.com/drinkingChai/good-shows'><i className="fab fa-github"></i></a>
    </footer>
  )
}
