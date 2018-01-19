import axios from 'axios'

const GET_POPULAR_SHOWS = 'GET_POPULAR_SHOWS'

const getPopularShows = (popularShows) => ({ type: GET_POPULAR_SHOWS, popularShows })

const initialState = []

export default function (state = initialState, action) {
  switch(action.type) {
    case GET_POPULAR_SHOWS:
      return action.popularShows
    default:
      return state
  }
}

export const fetchPopularShows = () => dispatch =>
  axios.get('/api/popular')  
    .then(res => dispatch(getPopularShows(res.data)))
