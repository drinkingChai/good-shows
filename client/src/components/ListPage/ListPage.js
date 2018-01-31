import React, { Component } from 'react'
import { connect } from 'react-redux'

// styles
import './ListPage.scss'

// components
import Input from '../Input/Input'
import ShowItem from './ShowItem/ShowItem'

// mappers
import { mapState } from '../../mappers/show.mapper'

class ListPage extends Component {
  state = {
    input: '',
    watched: [],
    toWatch: [],
    usershows: [],
    activeList: 'toWatch'
  }

  componentWillReceiveProps = nextProps => {
    const { watched, toWatch, usershows } = nextProps
    this.setState({ watched, toWatch, usershows })
  }

  componentDidMount = () => {
    const { watched, toWatch } = this.props
    this.setState({ watched, toWatch })
  }

  setActiveList = (listName) => (ev) => {
    this.setState({ activeList: listName })
  }

  handleSearch = (ev) => {
    this.setState({ input: ev.target.value }, () => {
      const { input  } = this.state
      let regExp = new RegExp(input, 'gi')

      if (input) {
        let matched = this.props.usershows.filter(showItem => {
          const { show } = showItem
          return show.name.match(regExp) || show.overview.match(regExp)
        })
        this.setState({ activeList: 'usershows', usershows: matched })
      } else {
        this.setState({ activeList: 'toWatch', usershows: this.props.usershows })
      }
    })
  }

  render = () => {
    const { activeList, input } = this.state
    const showList = this.state[activeList]

    return (
      <div className='ListPage'>
        <Input
          value={ input }
          onChange={ this.handleSearch }
          placeholder='SEARCH' />

        <div className='tabs'>
          <a onClick={ this.setActiveList('watched') } className={ `tab ${activeList === 'watched' ? 'active' : ''}` }>WATCHED</a>
          <a onClick={ this.setActiveList('toWatch') } className={ `tab ${activeList === 'toWatch' ? 'active' : ''}` }>TO WATCH</a>
        </div>

        { showList.map((showItem, i) => 
          <ShowItem item={ showItem } show={ showItem.show } key={ i } /> )}
      </div>
    )
  }
}

export default connect(mapState)(ListPage)