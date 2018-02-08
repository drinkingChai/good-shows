import React, { Component } from 'react'
import { connect } from 'react-redux'
import jdenticon from 'jdenticon'
import SVGInline from 'react-svg-inline'

// styles
import './Friend.scss'

// component
import Button from '../../Button/Button'

// mappers
import { mapDispatch } from '../../../mappers/friends.mapper'

const FriendInfo = ({ id, name, email }) =>
  <div className='friend-info'>
    <SVGInline svg={ jdenticon.toSvg(id, 50) } />
    <section>
      <h4>{ name }</h4>
      <p>{ email }</p>
    </section>
  </div>

class Friend extends Component {
  state = {
    id: null,
    name: '',
    email: '',
    status: '',
    buttonShown: false
  }

  componentWillReceiveProps = nextProps => {
    const { id, name, email, status } = nextProps
    this.setState({ id, name, email, status })
  }

  componentDidMount = () => {
    const { id, name, email, status } = this.props
    this.setState({ id, name, email, status })
  }

  showButton = () => {
    this.setState({ buttonShown: true })

    document.querySelector('body').classList.add('pop-over-open')
    document.addEventListener('click', this.popOverClick)
  }

  popOverClick = (ev) => {
    if (!this.popoverInner.contains(ev.target)) {
      document.removeEventListener('click', this.popOverClick)
      document.querySelector('body').classList.remove('pop-over-open')
      this.setState({ buttonShown: false })
    }
  }

  render = () => {
    const { id, name, email, status, buttonShown } = this.state
    const friendProps = { id, name, email }
    const { makeFriendRequest, confirmFriendRequest, searching } = this.props

    const btnStates = [
      { fn: makeFriendRequest, label: 'SEND FRIEND REQUEST', icon: 'fa fa-plus' },
      { fn: confirmFriendRequest, label: 'APPROVE FRIEND REQUEST', icon: 'fa fa-check' }
    ]

    // button only makes requests or confirms

    const btnState = searching && !status ? btnStates[0] :
          !searching && status === 'pending' ? btnStates[1] :
          null 

    // key is needed so SVG renders

    return (
      <div className='Friend'>
        {/* <div className='pop-over'></div> */}

        <FriendInfo { ...friendProps } />

        <div className='action'>
          { searching && status === 'pending' ?
            <div key={ 4 }><i className='fa fa-hourglass-half'></i></div> :
            status === 'pending' ?
            <div key={ 1 } onClick={ this.showButton }><i className='fa fa-check'></i></div> :
            status === 'friends' ?
            <div key={ 2 }><i className='fa fa-ellipsis-h'></i></div> :
            <div key={ 3 } onClick={ this.showButton }><i className='fa fa-plus'></i></div> }
        </div>

      { btnState && buttonShown ?
        <div className='pop-over'>
          <div className='inner' ref={ popoverInner => this.popoverInner = popoverInner }>
            <div className='Friend'>
              <FriendInfo { ...friendProps } />

              <div className='action'>
                <div><i className={btnState.icon}></i></div>
              </div>

              <Button
                onClick={ () => btnState.fn(id) }
                className={ `confirm-btn ${buttonShown ? 'shown' : ''}` }>{ btnState.label }</Button>
            </div>
          </div>
        </div> : null }
      </div> 
    )
  }
}

export default connect(null, mapDispatch)(Friend)