const OPEN_RECOMM = 'OPEN_RECOMM'
// const SET_SHOW = 'SET_SHOW'
const ADD_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'
const RESET = 'RESET'

export const openRecomm = () => ({ type: OPEN_RECOMM })
// export const setShow = show => ({ type: SET_SHOW, show }) // eslint-disable-line // will use getShow from show.reducer
export const addUser = user => ({ type: ADD_USER, user }) // eslint-disable-line
export const removeUser = user => ({ type: REMOVE_USER, user }) // eslint-disable-line
export const reset = () => ({ type: RESET }) // eslint-disable-line

const initialState = {
  isOpen: false,
  show: {},
  users: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case OPEN_RECOMM:
      return { ...state, isOpen: true }
    // case SET_SHOW:
      // return { ...state, show: action.show }
    case ADD_USER:
      return { ...state, users: [ ...state.users, action.user ] }
    case REMOVE_USER:
      return { ...state, users: state.users.filter(u => u.id !== action.user.id) }
    case RESET:
      return initialState
    default:
      return state
  }
}