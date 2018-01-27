import { signIn, regAndSignIn, verifyClientToken, signOut } from '../reducers/currentUser'
import { getUserLists } from '../reducers/userLists'

export const mapState = ({ currentUser, userLists, userShows }) => ({
  user: currentUser.userInfo,
  token: currentUser.token,
  lists: userLists,
  allShows: userLists.find(l => l.name === 'All Shows'),
  shows: userShows
})

export const mapDispatch = dispatch => ({
  attemptLogIn(email, password) {
    return dispatch(signIn(email, password))
      .then(() => dispatch(getUserLists()))
  },
  attemptRegister(name, email, password) {
    return dispatch(regAndSignIn(name, email, password))
      .then(() => dispatch(getUserLists()))
  },
  attemptLoadWithToken(token) {
    return dispatch(verifyClientToken(token))
      .then(() => dispatch(getUserLists()))
  },
  signUserOut() {
    dispatch(signOut())
  }
})
