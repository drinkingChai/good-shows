const SET_MESSAGE = 'SET_MESSAGE'

export const setMessage = message => ({ type: SET_MESSAGE, message })

const initialState = ''

export default function (state = initialState, action) {
  switch(action.type) {
    case SET_MESSAGE:
      return action.message
    default:
      return state
  }
}