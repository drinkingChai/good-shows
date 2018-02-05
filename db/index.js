const conn = require('./conn')
const User = require('./User')
const Friends = require('./Friends')
const Show = require('./Show')
const ShowItem = require('./ShowItem')

const sync = () => conn.sync()

// associations
ShowItem.belongsTo(User)
ShowItem.belongsTo(Show)
Show.hasMany(ShowItem)
User.belongsToMany(User, { as: 'friend', through: 'friends' }) // friend singular

module.exports = {
  sync,
  User,
  Friends,
  Show,
  ShowItem
}