const mongoose = require('mongoose')
mongoose.Promise = Promise

before(done => {
  mongoose.connect('mongodb://localhost/good_shows_test', { useMongoClient: true })
  mongoose.connection
    .once('open', () => done())
    .on('error', error => {
      console.warn('Error', error)
    })
})

beforeEach(done => {
  const { users, lists, shows, showdatas, comments } = mongoose.connection.collections // lowercase, mongo normalizes
  users.drop(() => {
    lists.drop(() => {
      shows.drop(() => {
        showdatas.drop(() => {
          comments.drop(() => {
            done()
          })
        })
      })
    })
  })
})
