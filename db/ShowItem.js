const conn = require('./conn'),
      Sequelize = conn.Sequelize

// valid lists are 'To Watch' and 'Watched'
const ShowItemSchema = {
  favorite: Sequelize.BOOLEAN,
  private: Sequelize.BOOLEAN,
  list: {
    type: Sequelize.STRING,
    defaultValue: 'To Watch'
  },
  notes: Sequelize.TEXT
}

const ShowItem = conn.define('showitem', ShowItemSchema)

module.exports = ShowItem