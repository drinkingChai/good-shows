import React from 'react'
import './Landing.css'
import Banner from './Banner/Banner'
import Blurb from './Blurb/Blurb'
import Footer from '../Footer/Footer'

export default function () {
  return (
    <div className='Landing'>
      <Banner />
      <Blurb />
      <Footer />
    </div>
    )
}
