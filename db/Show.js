const conn = require('./conn'),
      Sequelize = conn.Sequelize

const ShowSchema = {
  name: Sequelize.STRING,
  overview: Sequelize.TEXT,
  tmdbId: Sequelize.INTEGER,
  rating: Sequelize.FLOAT,
  firstAirDate: Sequelize.DATE 
}

const Show = conn.define('show', ShowSchema)

module.exports = Show