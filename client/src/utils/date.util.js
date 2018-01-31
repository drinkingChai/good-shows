export const formatDate = (str) => {
  if (!str) return ''

  let date = new Date(str),
      month = date.getMonth(),
      day = date.getDate(),
      year = date.getFullYear()

  return `${month}/${day}/${year}`
}