import React from 'react'
import jdenticon from 'jdenticon'
import SVGInline from 'react-svg-inline'

// styles
import './FriendInfo.scss'

const FriendInfo = ({ id, name, email }) =>
  <div className='FriendInfo'>
    <SVGInline svg={ jdenticon.toSvg(id, 50) } />
    <section>
      <h4>{ name }</h4>
      <p>{ email }</p>
    </section>
  </div>

export default FriendInfo