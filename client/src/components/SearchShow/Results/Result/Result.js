import React, { Component } from 'react'
import './Result.css'

class Result extends Component {
  state = {
    name: '',
    posterPath: '',
  }

  componentDidMount = () => {
    const { name } = this.props.info
    const posterPath = this.props.info.poster_path
    this.setState({ name, posterPath })
  }

  render = () => {
    return (
      <div className='Result'>
        <h4>{ this.state.name }</h4>
        <img src={ `http://image.tmdb.org/t/p/w342/${this.state.posterPath}` } alt='poster' />
      </div>
    )
  }
}

export default Result;
