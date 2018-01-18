import React from 'react'
import './Button.css'

export default function ({ buttonProps, label }) {
  buttonProps = buttonProps || {}

  return (
    <button className='Button' {...buttonProps}>{ label }</button>
  )
}
