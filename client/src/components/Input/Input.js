import React from 'react'

// styles
import './Input.css'

export default function (props) {
  return (
    <input {...props} className={ `Input ${ props.className ? props.className : '' }` } />
  )
}