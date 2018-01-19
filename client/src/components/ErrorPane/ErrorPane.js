import React, { Component } from 'react'
import './ErrorPane.css'

export default class ErrorPane extends Component {
  componentWillReceiveProps = nextProps => {
    this.inner.classList.add('shake')
    setTimeout(() => {
      this.inner.classList.remove('shake')
    }, 300)
  }

  render = () => {
    return (
      <div className={ `ErrorPane${this.props.visibility ? ' visible' : ' hidden'}` }>
        <div className='inner' ref={ (node) => this.inner = node }>
          {this.props.children}
        </div>
      </div>
    )
  }
}
