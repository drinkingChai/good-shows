import { signIn, regAndSignIn, verifyClientToken, signOut } from '../reducers/currentUser'
import { getUserLists } from '../reducers/userLists'
import { getUserShows } from '../reducers/userShows'

export const mapState = ({ currentUser, userLists, userShows }) => ({
  user: currentUser.userInfo,
  token: currentUser.token,
  lists: userLists,
  shows: userShows
})

export const mapDispatch = dispatch => ({
  attemptLogIn(email, password) {
    return dispatch(signIn(email, password))
      .then(() => dispatch(getUserLists()))
      .then(() => dispatch(getUserShows()))
  },
  attemptRegister(name, email, password) {
    return dispatch(regAndSignIn(name, email, password))
      .then(() => dispatch(getUserLists()))
      .then(() => dispatch(getUserShows()))
  },
  attemptLoadWithToken(token) {
    return dispatch(verifyClientToken(token))
      .then(() => dispatch(getUserLists()))
      .then(() => dispatch(getUserShows()))
  },
  signUserOut() {
    dispatch(signOut())
  }
})
