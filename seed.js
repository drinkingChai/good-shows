const conn = require('./db/conn')
const db = require('./db')
const { User } = db

const createUser = () =>
  Promise.all([
    User.create({ name: 'test', email: 'test@good.com', password: 'test' }),
    User.create({ name: 'test2', email: 'test2@good.com', password: 'test' })
  ])

conn.sync({ force: true })
  .then(() => createUser())
  .then(() => {
    conn.close()
  })