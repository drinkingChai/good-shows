import React from 'react'
import './Results.css'
import { connect } from 'react-redux'
import Result from './Result/Result'

const Results = (props) => {
  return (
    <div className='Results'>
      { props.results.map(result =>
        <Result
          key={ result.id }
          info={ result } /> )}
    </div>
  )
}

const mapState = ({ searchShowResults }) => ({
  page: +searchShowResults.page,
  totalPages: +searchShowResults.totalPages,
  results: searchShowResults.results
})
export default connect(mapState)(Results)
