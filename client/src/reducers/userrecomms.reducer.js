import axios from 'axios'

const SET_USER_RECOMMS = 'SET_USER_RECOMMS'

const setUserRecomms = recomms => ({ type: SET_USER_RECOMMS, recomms })

const initialState = []

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_USER_RECOMMS:
      return action.recomms
    default:
      return state
  }
}

export const getUserRecomms = () => dispatch =>
  axios.get('/api/recomms')
    .then(res => dispatch(setUserRecomms(res.data)))