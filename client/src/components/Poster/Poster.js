import React from 'react'

// styles
import './Poster.scss'

// utils
import { getPosterUrl } from '../../utils'

const Poster = (props) =>
  <div className='Poster'>
    <img src={ getPosterUrl(props.size, props.src) } alt='poster' />
  </div>

export default Poster