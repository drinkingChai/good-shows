import React from 'react'

// styles
import './Button.scss'

export default function (props) {
  return (
    <button {...props} className='Button'>{ props.children }</button>
  )
}