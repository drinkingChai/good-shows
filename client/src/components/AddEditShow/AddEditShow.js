import React, { Component } from 'react'
import './AddEditShow.css'
import getPosterUrl from '../../utils/getPosterUrl'
import { connect } from 'react-redux'
import { mapState } from '../../mappers/user'
import { mapDispatch } from '../../mappers/shows'

class AddEditShow extends Component {
  state = {
    info: {},
    lists: [],
    inList: false
  }

  componentWillReceiveProps = nextProps => {
    this.setState(nextProps)
  }

  componentDidMount = () => {
    this.setState(this.props)
  }

  handleClick = (list) => (ev) => {
    if (this.state.inList) {
      this.props.changeListTo(this.state.info.id, this.state.inList, list.name)
    } else {
      this.props.addShowToList(this.state.info.id, list.name)
    }
  }

  render = () => {
    return (
      <div className='AddEditShow'>
        <span className='title'>{ this.state.info.name }</span>
        <div className='image'>
          <img src={ getPosterUrl(342, this.state.info.poster_path) } alt='poster' />
        </div>
        <p>{ this.state.info.overview }</p>

        <div className='lists'>
        { this.state.lists.map((list, i) => 
          <li
            key={ i }
            onClick={ this.handleClick(list) }
          >{ list.name } { list.name === this.state.inList ? <i className='fa fa-check'></i> : null }</li>
        )}
        </div>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(AddEditShow)
