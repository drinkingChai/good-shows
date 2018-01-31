import { signIn, regAndSignIn, verifyClientToken, signOut } from '../reducers/user.reducer'
import { getUserShows } from '../reducers/usershows.reducer'

// utils
import axiosErrorParser from '../utils/axioserror.util'

export const mapState = ({ user }) => ({
  user: user.userInfo,
  token: user.token
})

export const mapDispatch = dispatch => ({
  attemptLogIn(email, password) {
    return dispatch(signIn(email, password))
      .then(() => dispatch(getUserShows()))
      .catch(axiosErrorParser)
  },
  attemptRegister(name, email, password) {
    return dispatch(regAndSignIn(name, email, password))
      .then(() => dispatch(getUserShows()))
      .catch(axiosErrorParser)
  },
  attemptLoadWithToken(token) {
    return dispatch(verifyClientToken(token))
      .then(() => dispatch(getUserShows()))
      .catch(axiosErrorParser)
  },
  signUserOut() {
    dispatch(signOut())
  }
})
