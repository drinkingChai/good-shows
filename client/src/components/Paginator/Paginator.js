import React, { Component } from 'react'
import './Paginator.css'

export default class Paginator extends Component {
  state = {
    page: 0,
    totalPages: 0
  }

  componentWillReceiveProps = (nextProps) => {
    const { page, totalPages } = nextProps
    this.setState({ page, totalPages })
  }

  render = () => {
    const { page, totalPages } = this.state
    let pageArr = []
    let minPage = page - 5 < 0 ? 0 : page - 5
    let maxPage = page + 4 > totalPages ? totalPages : page + 4
    for (let i = minPage; i < maxPage; i++) pageArr.push(i)

    return (
      <div className='Paginator'>
        { pageArr.map(p =>
          <span
            key={ p }
            className={ p + 1 === this.state.page ? 'oval current' : 'oval' }
            onClick={ () => this.props.onPageChange(p + 1) }
          ></span> )}
      </div>
    )
  }
}
