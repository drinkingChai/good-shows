const conn = require('./conn'),
      Sequelize = conn.Sequelize

const friendsSchema = {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^(pending$)|^(friends$)/,
      notEmpty: true
    }
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  friendId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}

const Friends = conn.define('friends', friendsSchema)

module.exports = Friends