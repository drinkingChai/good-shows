import React from 'react'

// styles
import './Poster.scss'

// utils
import { getPosterUrl } from '../../utils'

const Poster = (props) =>
  <img src={ getPosterUrl(props.size, props.src) } className='Poster' alt='poster' />

export default Poster