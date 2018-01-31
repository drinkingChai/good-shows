const conn = require('./conn')
const User = require('./User')
const Show = require('./Show')
const ShowItem = require('./ShowItem')

const sync = () => conn.sync()

// associations
ShowItem.belongsTo(User)
ShowItem.belongsTo(Show)
Show.hasMany(ShowItem)

module.exports = {
  sync,
  User,
  Show,
  ShowItem
}