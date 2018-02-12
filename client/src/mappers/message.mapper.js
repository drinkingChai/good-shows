import { setMessage } from '../reducers/message.reducer'

export const mapState = ({ message }) => ({
  message
})

export const mapDispatch = dispatch => ({
  setMessage(msg) {
    dispatch(setMessage(msg))
  }
})