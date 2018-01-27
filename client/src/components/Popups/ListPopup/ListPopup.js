import React, { Component } from 'react'
import './ListPopup.css'
import { connect } from 'react-redux'
import { mapState } from '../../../mappers/user'
import { mapDispatch } from '../../../mappers/shows'

class ListPopup extends Component {
  state = { lists: [], inList: false }

  componentDidMount = () => {
    this.setStateFromProps(this.props)
  }

  componentWillReceiveProps = nextProps => {
    this.setStateFromProps(nextProps)
  }

  setStateFromProps = (_props) => {
    let lists = _props.lists.filter(l => l.name !== 'All Shows')
    this.setState({
      lists,
      inList: _props.inList
    })
  }

  handleListClick = (listName) => (ev) => {
    if (this.state.inList) {
      // this.props.changeListTo(this.props.tmdbId, listName)
    } else {
      this.props.addShowToList(this.props.tmdbId, listName)
    }
  }

  handleRemoveClick = (ev) => {
    this.props.removeShowFromList(this.props.tmdbId)
  }

  render = () => {
    return (
      <div className='ListPopup'>
        <li className='create-new-list'>Create a new list</li>
        { this.state.lists.map(list =>
          <li
            onClick={ this.handleListClick(list.name) }
            className={ `${list.name === this.state.inList ? 'in-list' : 'not-in-list'}` }
            key={ list._id }
          >
            { list.name }
            { list.name === this.state.inList && <i className='ti-check'></i> }
          </li>
        )}
        <li
          onClick={ this.handleRemoveClick }
          className='remove-x'
        >Remove</li>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(ListPopup)
