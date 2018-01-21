import React from 'react'
import './Landing.css'
import Banner from './Banner/Banner'
import Section from '../Section/Section'
import section1 from '../../images/section1.png'
import section2 from '../../images/section2.png'

export default function() {
  return (
    <div className='Landing'>
      <Banner />

      <div className="sections">
        <Section
          title='Add shows and movies to your watchlist'
          content={
            <div>
              <p>Search for shows and movies and</p>
              <p>add them to your watchlists!</p>
            </div>
          }
          image={ section1 }
        />
        <Section
          title='Stay up to date with your friends'
          content={
            <div>
              <p>Add your friends and stay up to</p>
              <p>date with what they’re watching!</p>
            </div>
          }
          image={ section2 }
        />
      </div>
    </div>
  )
}
