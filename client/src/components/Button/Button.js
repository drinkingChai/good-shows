import React from 'react'
import './Button.css'

const Button = ({ buttonProps, label }) => {
  buttonProps = buttonProps || {}

  return (
    <button className='Button' {...buttonProps}>{ label }</button>
  )
}

export const withButtonProps = (label) => (buttonProps) =>
  <Button buttonProps={ buttonProps } label={ label } />
  
export default Button
