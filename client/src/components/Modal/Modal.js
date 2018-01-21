import React, { Component } from 'react'
import './Modal.css'

class Modal extends Component {
  state = { open: false }

  componentWillReceiveProps = nextProps => {
    if (nextProps.open) {
      document.addEventListener('click', this.clickFunction)
      document.querySelector('body').classList.add('modal-open')
      this.setState({ open: true })
    } else {
      document.removeEventListener('click', this.clickFunction)
      document.querySelector('body').classList.remove('modal-open')
      this.setState({ open: false })
    }
  } 

  clickFunction = (ev) => {
    if (!this.node.contains(ev.target)) {
      document.removeEventListener('click', this.clickFunction)
      document.querySelector('body').classList.remove('modal-open')
      this.setState({ open: false })
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.clickFunction)
    document.querySelector('body').classList.remove('modal-open')
    this.setState({ open: false })
  }

  render = () => {
    return (
      <div className={ `Modal ${this.state.open ? 'open' : 'closed' }` }>
        <div className='inner' ref={ node => this.node = node }>
          { this.props.children }
        </div>
      </div>
    ) 
  }
}

export default Modal
