import React, { Component } from 'react'
import './Trending.css'
import { connect } from 'react-redux'
import { fetchPopularShows } from '../../../reducers/popularShows'

class Trending extends Component {
  state = { shows: [] }

  componentDidMount = () => {
    this.props.loadPopularShows()
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ shows: nextProps.shows })
  }

  render = () => {
    const { shows } = this.state

    return (
      <div className='Trending'>
        <h3>Trending Now!</h3>
        <div>
        { shows.map(show =>
          <img
            className='poster'
            key={ show.id }
            src={`http://image.tmdb.org/t/p/w342/${show.poster_path}`} alt='poster'
          />
        )}
        </div>
      </div>
    )
  }
}

const mapState = ({ popularShows }) => ({
  shows: popularShows.results
})
const mapDispatch = dispatch => ({
  loadPopularShows() {
    dispatch(fetchPopularShows())
  }
})
export default connect(mapState, mapDispatch)(Trending)
