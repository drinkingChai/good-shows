import { signIn, regAndSignIn, verifyClientToken, signOut } from '../reducers/currentUser'

export const mapState = ({ currentUser }) => ({
  user: currentUser.userInfo,
  token: currentUser.token
})

export const mapDispatch = dispatch => ({
  attemptLogIn(email, password) {
    return dispatch(signIn(email, password))
  },
  attemptRegister(name, email, password) {
    return dispatch(regAndSignIn(name, email, password))
  },
  attemptLoadWithToken(token) {
    return dispatch(verifyClientToken(token))
  },
  signUserOut() {
    dispatch(signOut())
  }
})
