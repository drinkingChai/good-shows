import axios from 'axios'

const SET_USER_SHOWS = 'SET_USER_SHOWS'

const setUserShows = (shows) => ({ type: SET_USER_SHOWS, shows })

const initialState = []

export default function (state = initialState, action) {
  switch(action.type) {
    case SET_USER_SHOWS:
      return action.shows
    default:
      return state
  }
}

export const getUserShows = () => dispatch =>
  axios.get('/api/shows')
    .then((res) => dispatch(setUserShows(res.data)))

export const addShow = (tmdbId) => dispatch =>
  axios.post('/api/shows', { tmdbId })