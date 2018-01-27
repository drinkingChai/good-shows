import { signIn, regAndSignIn, verifyClientToken, signOut } from '../reducers/currentUser'
import { getUserLists } from '../reducers/userLists'
import { getAllShows } from '../reducers/userAllShows'

export const mapState = ({ currentUser, userLists, userAllShows }) => ({
  user: currentUser.userInfo,
  token: currentUser.token,
  lists: userLists,
  allShows: userAllShows,
})

export const mapDispatch = dispatch => ({
  attemptLogIn(email, password) {
    return dispatch(signIn(email, password))
      .then(() => dispatch(getUserLists()))
      .then(() => dispatch(getAllShows()))
  },
  attemptRegister(name, email, password) {
    return dispatch(regAndSignIn(name, email, password))
      .then(() => dispatch(getUserLists()))
      .then(() => dispatch(getAllShows()))
  },
  attemptLoadWithToken(token) {
    return dispatch(verifyClientToken(token))
      .then(() => dispatch(getUserLists()))
      .then(() => dispatch(getAllShows()))
  },
  signUserOut() {
    dispatch(signOut())
  }
})
