import React, { Component } from 'react'
import './Landing.css'
import { connect } from 'react-redux'
import { fetchPopularShows } from '../../reducers/popularShows'

class Landing extends Component {
  componentDidMount = () => {
    this.props.loadPopularShows()
  }

  render = () => {
    const { shows } = this.props

    return (
      <div>
      </div>
    )
  }
}
 
const mapState = ({ popularShows }) => ({
  shows: popularShows
})
const mapDispatch = dispatch => ({
  loadPopularShows() {
    dispatch(fetchPopularShows())
  }
})
export default connect(mapState, mapDispatch)(Landing)
