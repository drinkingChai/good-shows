const mongoose = require('mongoose')
const path = require('path')
mongoose.Promise = Promise

require('dotenv').config()

before(done => {
  mongoose.connect('mongodb://localhost/good_shows_test', { useMongoClient: true })
  mongoose.connection
    .once('open', () => done())
    .on('error', error => {
      console.warn('Error', error)
    })
})

beforeEach(done => {
  const { users, lists, shows, showdatas, comments, genres } = mongoose.connection.collections // lowercase, mongo normalizes
  users.drop(() => {
    showdatas.drop(() => {
      shows.drop(() => {
        comments.drop(() => {
          genres.drop(() => {
            done()
          })
        })
      })
    })
  })
})
