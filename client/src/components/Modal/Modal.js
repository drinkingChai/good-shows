import React, { Component } from 'react'
import './Modal.css'

class Modal extends Component {
  state = { open: false }

  componentWillReceiveProps = nextProps => {
    if (nextProps.open) { this.addListener() }
    else { this.removeListener() }
  } 

  clickFunction = (ev) => {
    if (!this.node.contains(ev.target)) { this.removeListener() }
  }

  addListener = () => {
    document.addEventListener('click', this.clickFunction)
    document.querySelector('body').classList.add('modal-open')
    this.setState({ open: true })
  }

  removeListener = () => {
    document.removeEventListener('click', this.clickFunction)
    document.querySelector('body').classList.remove('modal-open')
    this.setState({ open: false })
  }

  componentWillUnmount = () => {
    this.removeListener()
  }

  close = () => {
    this.removeListener()
  }

  render = () => {
    return (
      <div className={ `Modal ${this.state.open ? 'open' : 'closed' }` }>
        <div className='inner' ref={ node => this.node = node }>
          { !this.props.hideClose && <button className='close' onClick={ this.close }><i className='ti-close'></i></button> }
          { this.props.children }
        </div>
      </div>
    ) 
  }
}

export default Modal
