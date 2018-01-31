const conn = require('./conn'),
      Sequelize = conn.Sequelize

// valid lists are 'To Watch' and 'Watched'
const ShowItemSchema = {
  favorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  private: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  list: {
    type: Sequelize.STRING,
    defaultValue: 'To Watch'
  },
  notes: {
    type: Sequelize.TEXT,
    defaultValue: ''
  }
}

const ShowItem = conn.define('showitem', ShowItemSchema)

module.exports = ShowItem