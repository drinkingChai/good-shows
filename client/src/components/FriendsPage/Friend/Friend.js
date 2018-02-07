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
    email: '',
    status: ''
  }

  componentWillReceiveProps = nextProps => {
    const { id, name, email, status } = nextProps
    this.setState({ id, name, email, status })
  }

  componentDidMount = () => {
    const { id, name, email, status } = this.props
    this.setState({ id, name, email, status })
  }

  render = () => {
    const { id, name, email, status } = this.state
    const { makeFriendRequest, confirmFriendRequest, searching } = this.props

    // key is needed so SVG renders

    return (
      <div>
        <SVGInline svg={ jdenticon.toSvg(id, 50) } />
        <h4>{ name }</h4>
        <p>{ email }</p>
        <span className='action'>
          { searching && status === 'pending' ?
            <div key={ 4 }><i className='fa fa-hourglass-half'></i></div> :
            status === 'pending' ?
            <div key={ 1 } onClick={ () => confirmFriendRequest(id) }><i className='fa fa-check'></i></div> :
            status === 'friends' ?
            <div key={ 2 }><i className='fa fa-ellipsis-h'></i></div> :
            <div key={ 3 } onClick={ () => makeFriendRequest(id) }><i className='fa fa-plus'></i></div> }
        </span>
      </div> 
    )
  }
}

export default connect(null, mapDispatch)(Friend)