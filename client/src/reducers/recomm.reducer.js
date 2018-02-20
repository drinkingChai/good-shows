import axios from 'axios'

const OPEN_RECOMM = 'OPEN_RECOMM'
const RESET = 'RESET'

export const openRecomm = () => ({ type: OPEN_RECOMM })
export const reset = () => ({ type: RESET }) // eslint-disable-line

const initialState = {
  isOpen: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case OPEN_RECOMM:
      return { ...state, isOpen: true }
    case RESET:
      return initialState
    default:
      return state
  }
}

export const makeRecomms = (showInfo, friendIds) => dispatch =>
  axios.post('/api/recomms', { ...showInfo, friendIds })