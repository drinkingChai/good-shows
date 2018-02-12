import React, { Component } from 'react'
import { connect } from 'react-redux'

// styles
import './Message.scss'
import '../TopBar/TopBar.scss'

// relies on message reducer
import { mapState, mapDispatch } from '../../mappers/message.mapper'

class Message extends Component {
  state = {
    interval: null
  }

  componentWillReceiveProps = nextProps => {
    const { interval } = this.state
    const { setMessage } = this.props

    clearInterval(interval)

    if (nextProps.message) {
      const newInterval = setInterval(() => {
        const { interval } = this.state
        clearInterval(interval)

        this.setState({ interval: null })
        setMessage('')
      }, 2000)

      this.setState({ interval: newInterval })
    }
  }

  render = () => {
    const { interval } = this.state
    const { message } = this.props

    return (
      <div className={ `Message TopBar ${interval ? 'shown' : ''}` }>
        <p>{ message }</p>
      </div>
    )
  }
}
  

export default connect(mapState, mapDispatch)(Message)