export default function axiosErrorParser(err) {
  // let data = err.response.data.split(',')
  let data = err.response.data
  // console.log(data)
  // if (Array.isArray(data)) {
    // data = data.map(str => {
      // let split = str.toString().split(': ')
      // return split[split.length - 1]
    // }).join('\n')
  // }
  // else {
    let split = data.toString().split(': ')
    data = split[split.length - 1]
  // }
  return data
}