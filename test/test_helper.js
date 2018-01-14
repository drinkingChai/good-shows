const mongoose = require('mongoose')
mongoose.Promise = Promise

before(done => {
  // runs only once for all tests
  mongoose.connect('mongodb://localhost/good_shows_test', { useMongoClient: true })
  mongoose.connection
    .once('open', () => done())
    .on('error', error => {
      console.warn('Error', error)
    })
})

beforeEach(done => {
  // mongoose.connection.collections.users.drop(() => {
  //   done()
  // })
  // mongoose.connection.collections.drop(() => {
  //   done()
  // })
  done()
})
