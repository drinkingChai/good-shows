import React from 'react'

// styles
import './Tabs.scss'

// @Array {items}
// [{ stateName: @String, label: @string }]
const Tabs = ({ items, setActiveList, activeList }) =>
  <div className='Tabs'>
  { items.map((item, i) =>
    <a
      key={ i }
      onClick={ setActiveList(item.stateName) }
      className={ `tab ${activeList === item.stateName ? 'active' : ''}` }>{ item.label }</a> )} 
  </div>

export default Tabs