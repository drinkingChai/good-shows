import React from 'react'

// styles
import './Button.css'

export default function (props) {
  return (
    <button {...props} className='Button'>{ props.children }</button>
  )
}