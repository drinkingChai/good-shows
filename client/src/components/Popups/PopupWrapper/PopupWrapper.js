import React, { Component } from 'react'
import './PopupWrapper.css'

class PopupWrapper extends Component {
  state = { open: false, cursor: { top: 0, left: 0 } }

  componentWillReceiveProps = nextProps => {
    if (nextProps.open) {
      this.addListener()
      this.setState({ cursor: nextProps.cursor })
    }
    else {
      this.removeListener(true)
      this.setState({ cursor: {} })
    }
  }

  clickFunction = (ev) => {
    if (!this.node.contains(ev.target)) { this.removeListener() }
  }

  addListener = () => {
    document.addEventListener('click', this.clickFunction)
    this.setState({ open: true })
  }

  removeListener = (fromParent) => {
    document.removeEventListener('click', this.clickFunction)
    this.setState({ open: false })
    if (!fromParent) this.props.onClose()
  }

  componentWillUnmount = () => {
    this.removeListener()
  }

  close = () => {
    this.removeListener()
  }

  render = () => {
    return (
      <div
        className={ `PopupWrapper ${this.state.open ? 'open' : 'closed'}` }
        ref={ node => this.outer = node }
      >
        <div 
          className='inner'
          ref={ node => this.node = node }
        >
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default PopupWrapper 
