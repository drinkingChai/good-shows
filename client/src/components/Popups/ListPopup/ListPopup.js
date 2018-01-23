import React, { Component } from 'react'
import './ListPopup.css'
import { connect } from 'react-redux'
import { mapState } from '../../../mappers/user'
import { mapDispatch } from '../../../mappers/shows'

class ListPopup extends Component {
  state = { lists: [], inList: null }

  componentWillReceiveProps = nextProps => {
    let hasShow = nextProps.shows.find(s => s.showData.tmdbId === nextProps.tmdbId)

    this.setState({
      lists: nextProps.lists,
      inList: hasShow ? hasShow.list.name : null
    })
  }

  handleListClick = (listName) => (ev) => {
    this.props.addShowToList(this.props.tmdbId, listName)
  }

  render = () => {
    return (
      <div className='ListPopup'>
        { this.state.lists.map(list =>
          <div
            onClick={ this.handleListClick(list.name) }
            className={ `list-item ${list.name === this.state.inList ? 'in-list' : 'not-in-list'}` }
            key={ list._id }
          >
            { list.name }
            { list.name === this.state.inList && <i className='ti-check'></i> }
          </div>
        )}
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(ListPopup)
