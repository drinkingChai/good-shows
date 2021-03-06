import { signIn, regAndSignIn, verifyClientToken, signOut, updateUser, changePassword } from '../reducers/user.reducer'
import { getUserShows } from '../reducers/usershows.reducer'
import { getUserFriends, getFriendRequests } from '../reducers/friends.reducer'
import { getUserRecomms } from '../reducers/userrecomms.reducer'
import { getNotifications } from '../reducers/notifications.reducer'
import { setMessage } from '../reducers/message.reducer'

// utils
import getAxiosError from '../utils/axioserror.util'

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
      .then(() => dispatch(getUserRecomms()))
      .then(() => dispatch(getNotifications()))
      .catch(getAxiosError)
  },
  attemptRegister(name, email, password) {
    return dispatch(regAndSignIn(name, email, password))
      .then(() => dispatch(getUserShows()))
      .then(() => dispatch(getUserFriends()))
      .then(() => dispatch(getFriendRequests()))
      .then(() => dispatch(getUserRecomms()))
      .then(() => dispatch(getNotifications()))
      .catch(getAxiosError)
  },
  attemptLoadWithToken(token) {
    return dispatch(verifyClientToken(token))
      .then(() => dispatch(getUserShows()))
      .then(() => dispatch(getUserFriends()))
      .then(() => dispatch(getFriendRequests()))
      .then(() => dispatch(getUserRecomms()))
      .then(() => dispatch(getNotifications()))
      .catch(getAxiosError)
  },
  signUserOut() {
    dispatch(signOut())
  },
  attemptUpdate(userInfo) {
    return dispatch(updateUser(userInfo))
      .catch(getAxiosError)
  },
  attemptPasswordChange(currentpass, newpass) {
    return dispatch(changePassword(currentpass, newpass))
      .catch(getAxiosError)
  },
  setMsg(msg) {
    return dispatch(setMessage(msg))
  }
})
