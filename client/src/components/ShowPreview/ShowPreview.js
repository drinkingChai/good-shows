import React from 'react'

// styles
import './ShowPreview.scss'

// components
import Poster from '../Poster/Poster'

const ShowPreview = ({ children, poster_path, name, overview }) =>
  <div className='ShowPreview'>
    <Poster src={ poster_path } size={ 185 } />

    <section>
      <h4 className='title'>{ name }</h4>
      <p className='overview'>{ overview && overview.length > 110 ? overview.slice(0, 110) + '...' : overview }</p>
      
      { children }
    </section>
  </div>

export default ShowPreview