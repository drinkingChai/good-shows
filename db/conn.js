require('dotenv').config()

const databaseUrl = process.env.NODE_ENV === 'test' ? process.env.PG_TEST_DATABASE_URL : process.env.PG_DATABASE_URL
const Sequelize = require('sequelize')
const conn = new Sequelize(databaseUrl, { logging: false, operatorsAliases: false })

module.exports = conn