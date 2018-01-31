import React from 'react'

// styles
import './Input.scss'

export default function (props) {
  return (
    <input {...props} className={ `Input ${ props.className ? props.className : '' }` } />
  )
}