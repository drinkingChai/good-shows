import axios from 'axios'

export default function (searchStr, page = '1') {
  return function (dispatch) {
    return axios.get(`/api/search?name=${searchStr}&page=${page}`)
      .then(res => { return res.data })
  }
}
