import React from 'react'
import './Section.css'

export default function (props) {
  return (
    <div className='Section'>
      <h3>{ props.title }</h3>
      { props.content }
      
      <img src={ props.image } alt='section' />
    </div>
  )
}
