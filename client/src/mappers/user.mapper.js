import { signIn, regAndSignIn, verifyClientToken, signOut } from '../reducers/user.reducer'

// utils
import axiosErrorParser from '../utils/axioserror.util'

export const mapState = ({ user }) => ({
  user: user.userInfo,
  token: user.token
})

export const mapDispatch = dispatch => ({
  attemptLogIn(email, password) {
    return dispatch(signIn(email, password))
      .catch(axiosErrorParser)
  },
  attemptRegister(name, email, password) {
    return dispatch(regAndSignIn(name, email, password))
      .catch(axiosErrorParser)
  },
  attemptLoadWithToken(token) {
    return dispatch(verifyClientToken(token))
      .catch(axiosErrorParser)
  },
  signUserOut() {
    dispatch(signOut())
  }
})
