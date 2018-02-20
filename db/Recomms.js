// recommendations
const conn = require('./conn'),
      Sequelize = conn.Sequelize

// delete if recommendation is accepted
const recommsSchema = {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^(pending$)|^(seen$)|^(denied$)/,
      notEmpty: true
    }
  },
  notes: Sequelize.TEXT,
  tmdbId: Sequelize.INTEGER,
  name: Sequelize.STRING,
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  friendId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}

const Recomms = conn.define('recomms', recommsSchema)

module.exports = Recomms