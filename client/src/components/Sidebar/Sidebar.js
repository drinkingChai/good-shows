import React from 'react'
import './Sidebar.css'

export default function (props) {
  return (
    <div className='Sidebar'>
    { props.children }
    </div>
  ) 
}