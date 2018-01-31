const conn = require('./conn'),
      Sequelize = conn.Sequelize

const ShowSchema = {
  name: Sequelize.STRING,
  overview: Sequelize.TEXT,
  tmdbId: Sequelize.INTEGER,
  vote_average: Sequelize.FLOAT,
  first_air_date: Sequelize.DATE,
  poster_path: Sequelize.STRING 
}

const Show = conn.define('show', ShowSchema)

module.exports = Show