import React, { Component } from 'react'
import './LocalModal.css'

class LocalModal extends Component {
  state = { open: false, cursor: {} }

  componentWillReceiveProps = nextProps => {
    if (nextProps.open) {
      this.addListener()
      this.setState({ cursor: nextProps.cursor })
    }
    else {
      this.removeListener()
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

  removeListener = () => {
    document.removeEventListener('click', this.clickFunction)
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
      <div className={ `LocalModal ${this.state.open ? 'open' : 'closed'}` } ref={ node => this.outer = node }>
        { !this.props.hideClose && <button className='close' onClick={ this.close }><i className='ti-close'></i></button> }
        <div className='inner' ref={ node => this.node = node } style={{ top: this.state.cursor.y, left: this.state.cursor.x }}>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default LocalModal
