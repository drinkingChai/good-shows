import React, { Component } from 'react'
import { connect } from 'react-redux'

// styles
import './ListPage.scss'

// components
import Input from '../Input/Input'
import ShowItem from './ShowItem/ShowItem'
import Tabs from '../Tabs/Tabs'

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

        <Tabs
          items={ [{ stateName: 'watched', label: 'WATCHED' }, { stateName: 'toWatch', label: 'TO WATCH' }] }
          setActiveList={ this.setActiveList }
          activeList={ activeList } />

        { showList.map((showItem, i) => 
          <ShowItem item={ showItem } show={ showItem.show } key={ i } /> )}
      </div>
    )
  }
}

export default connect(mapState)(ListPage)