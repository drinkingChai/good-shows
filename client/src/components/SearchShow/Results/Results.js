import React from 'react'
import './Results.css'
import Result from './Result/Result'

const Results = (props) => {
  return (
    <div className='Results'>
      { props.results && props.results.map(result =>
        <Result
          key={ result.id }
          info={ result } /> )}
    </div>
  )
}

export default Results
