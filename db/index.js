const conn = require('./conn')
const User = require('./User')
const Friends = require('./Friends')
const Show = require('./Show')
const ShowItem = require('./ShowItem')
const Recomms = require('./Recomms')

const sync = () => conn.sync()

// associations
ShowItem.belongsTo(User)
ShowItem.belongsTo(Show)
Show.hasMany(ShowItem)

module.exports = {
  sync,
  User,
  Friends,
  Show,
  ShowItem,
  Recomms
}