const conn = require('./conn')
const User = require('./User')

const sync = () => conn.sync()

module.exports = {
  sync,
  User
}