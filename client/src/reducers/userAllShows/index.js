import axios from 'axios'

const SET_ALL_SHOWS = 'SET_ALL_SHOWS'

const setAllShows = (shows) => ({ type: SET_ALL_SHOWS, shows })

const initialState = []

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ALL_SHOWS:
      return action.shows
    default:
      return state
  }
}

export const getAllShows = () => dispatch =>
  axios.get('/api/list/allshows')
    .then(res => dispatch(setAllShows(res.data)))
    