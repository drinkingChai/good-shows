import { signIn, regAndSignIn, verifyClientToken, signOut, updateUser, changePassword } from '../reducers/user.reducer'
import { getUserShows } from '../reducers/usershows.reducer'
import { getUserFriends, getFriendRequests } from '../reducers/friends.reducer'
import { setMessage } from '../reducers/message.reducer'

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
      .then(() => dispatch(getUserFriends()))
      .then(() => dispatch(getFriendRequests()))
      .catch(axiosErrorParser)
  },
  attemptRegister(name, email, password) {
    return dispatch(regAndSignIn(name, email, password))
      .then(() => dispatch(getUserShows()))
      .then(() => dispatch(getUserFriends()))
      .then(() => dispatch(getFriendRequests()))
      .catch(axiosErrorParser)
  },
  attemptLoadWithToken(token) {
    return dispatch(verifyClientToken(token))
      .then(() => dispatch(getUserShows()))
      .then(() => dispatch(getUserFriends()))
      .then(() => dispatch(getFriendRequests()))
      .catch(axiosErrorParser)
  },
  signUserOut() {
    dispatch(signOut())
  },
  attemptUpdate(userInfo) {
    return dispatch(updateUser(userInfo))
  },
  attemptPasswordChange(currentpass, newpass) {
    return dispatch(changePassword(currentpass, newpass))
  },
  setErrMsg(msg) {
    return dispatch(setMessage(msg))
  }
})
