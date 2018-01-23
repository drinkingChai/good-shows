import axios from 'axios'

const SET_LISTS = 'SET_LISTS'

const setLists = (lists) => ({ type: SET_LISTS, lists })

const initialState = []

export default function (state = initialState, action) {
  switch(action.type) {
    case SET_LISTS:
      return action.lists
    default:
      return state
  }
}

export const getUserLists = () => dispatch =>
  axios.get('/api/list')
    .then(res => dispatch(setLists(res.data)))
