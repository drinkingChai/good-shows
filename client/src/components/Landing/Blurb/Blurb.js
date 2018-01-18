import React from 'react'
import './Blurb.css'

export default function () {
  return (
    <div className='Blurb'>
      <h3>Find Your Next Show</h3>
      <p>
        good<span>shows</span> is a site to have a singular watch list.
        With great streaming sites like Hulu, Netflix, and HBO, it can be
        difficult to keep separate “watch list” for each one.
        good<span>shows</span> gives you one place manage your watchlist,
        and lets your friends know what you’re watching.
      </p>
      <p>Create an account or log in on the right to get started.</p>

      <div className='blurb-footer'>
        <a href="/">Contact</a>
      </div>
    </div>
  )
}
