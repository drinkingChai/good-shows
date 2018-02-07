import React, { Component } from 'react'
import { connect } from 'react-redux'
import jdenticon from 'jdenticon'
import SVGInline from 'react-svg-inline'

// styles
import './Friend.scss'

// mappers
import { mapDispatch } from '../../../mappers/friends.mapper'

class Friend extends Component {
  state = {
    id: null,
    name: '',
    email: ''
  }

  componentWillReceiveProps = nextProps => {
    const { id, name, email } = nextProps
    this.setState({ id, name, email })
  }

  componentDidMount = () => {
    const { id, name, email } = this.props
    this.setState({ id, name, email })
  }

  render = () => {
    const { id, name, email } = this.state
    const { makeFriendRequest, confirmFriendRequest } = this.props

    return (
      <div>
        <SVGInline svg={ jdenticon.toSvg(id, 50) } />
        <h4>{ name }</h4>
        <p>{ email }</p>
        <span className='action'>
          <div onClick={ () => makeFriendRequest(id) }><i className='fa fa-plus'></i></div>
          <i className='fa fa-hourglass-half'></i>
          <i className='fa fa-ellipsis-h'></i>
          <div onClick={ () => confirmFriendRequest(id) }><i className='fa fa-check'></i></div>
        </span>
      </div> 
    )
  }
}

export default connect(null, mapDispatch)(Friend)