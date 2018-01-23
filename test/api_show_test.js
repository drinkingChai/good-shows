const assert = require('assert')
const request = require('supertest')
const server = require('../server')
const qs = require('qs')
const ShowData = require('../server/src/showData')
const User = require('../server/src/user')
const { createUser } = require('../server/src/helpers/createUser')

describe.only('ADD show test', () => {
  // add, remove
  // add/remove favorite
  // change list
  let peter

  beforeEach((done) => {
    peter = new User({
      name: 'Peter',
      email: 'peter@dragon.com',
      password: 'peter'
    })

    createUser(peter)
      .then(() => done())
      .catch(done)
  })

  xit('/POST add a show to user list', (done) => {
    request(server)
      .post('/api/auth/local')
      .send({ email: peter.email, password: 'peter' })
      .end((err, res) => {
        if (err) return done(err)

        let { token } = res.body
        request(server)
          .post('/api/show')
          .set('Authorization', `Bearer ${token}`)
          .send({ tmdbId: 1399 })
          .end((err, res) => {
            if (err) return done(err)

            User.findOne({ email: peter.email })            
              .populate({
                path: 'shows',
                populate: {
                  path: 'showData',
                  model: 'showData'
                }
              })
              .then(user => {
                assert(user.shows.length === 1)
                assert(user.shows[0].showData.name === 'Game of Thrones')
                done()
              })
              .catch(done)
            })
      })
  })

  xit('/DELETE remove a show from user list', (done) => {
    request(server)
      .post('/api/auth/local')
      .send({ email: peter.email, password: 'peter' })
      .end((err, res) => {
        if (err) return done(err)

        let { token } = res.body

        request(server)
          .post('/api/show')
          .set('Authorization', `Bearer ${token}`)
          .send({ tmdbId: 1399 })
          .end((err, res) => {
            if (err) return done(err)

            request(server)
              .delete('/api/show')
              .set('Authorization', `Bearer ${token}`)
              .send({ tmdbId: 1399 })
              .end((err, res) => {
                if (err) return done(err)

                User.findOne({ email: peter.email })
                  .then(user => {
                    assert(user.shows.length === 0)
                    done()
                  })
                  .catch(done)
              })
          })
      })
  })

  xit('/PUT change list', (done) => {
    request(server)
      .post('/api/auth/local')
      .send({ email: peter.email, password: 'peter' })
      .end((err, res) => {
        if (err) return done(err)

        let { token } = res.body

        request(server)
          .post('/api/show')
          .set('Authorization', `Bearer ${token}`)
          .send({ tmdbId: 1399 })
          .end((err, res) => {
            if (err) return done(err)

            request(server)
              .put('/api/show/list')
              .set('Authorization', `Bearer ${token}`)
              .send({ list: 'Watching', tmdbId: 1399 })
              .end((err, res) => {
                if (err) return done(err)

                User.findOne({ email: peter.email })
                  .populate({
                    path: 'shows',
                    model: 'show',
                    populate: {
                      path: 'list',
                      model: 'list'
                    }
                  })
                  .then(user => {
                    assert(user.shows[0].list.name === 'Watching')
                    done()
                  })
                  .catch(done)
              })
          })
      })
  })

  xit('/PUT add/remove from favorites', (done) => {
    request(server)
      .post('/api/auth/local')
      .send({ email: peter.email, password: 'peter' })
      .end((err, res) => {
        if (err) return done(err)

        let { token } = res.body

        request(server)
          .post('/api/show')
          .set('Authorization', `Bearer ${token}`)
          .send({ tmdbId: 1399 })
          .end((err, res) => {
            if (err) return done(err)

            request(server)
              .put('/api/show')
              .set('Authorization', `Bearer ${token}`)
              .send({ tmdbId: 1399, favorite: true })
              .end((err, res) => {
                if (err) return done(err)

                User.findOne({ email: peter.email })
                  .populate('shows')
                  .then(user => {
                    assert(user.shows[0].favorite === true)
                    done()
                  })
                  .catch(done)
              })
          })
      })
  })
})
