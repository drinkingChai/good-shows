export default function axiosErrorParser(err) {
  return err.response.data.toString()
}