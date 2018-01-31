const conn = require('./db/conn')
const db = require('./db')
const { User } = db

const createUser = () =>
  User.create({ email: 'test@good.com', password: 'test@good.com' })

conn.sync({ force: true })
  .then(() => createUser())
  .then(() => {
    conn.close()
  })