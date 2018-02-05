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
  }
}

const Friends = conn.define('friends', friendsSchema)

module.exports = Friends