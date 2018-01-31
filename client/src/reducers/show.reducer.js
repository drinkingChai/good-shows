import axios from 'axios'

const SET_SHOW = 'SET_SHOW'

const setShow = (show) => ({ type: SET_SHOW, show })

const initialState = {}

export default function (state = initialState, action) {
  switch(action.type) {
    case SET_SHOW:
      return action.show
    default:
      return state
  }
}

export const getShow = (tmdbId) => dispatch =>
  axios.get(`/api/search/${tmdbId}`)
    .then((res) => dispatch(setShow(res.data)))