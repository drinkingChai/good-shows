const assert = require('assert')
const request = require('supertest')
const server = require('../server')
const ShowData = require('../server/src/showData')
const User = require('../server/src/user')
const Show = require('../server/src/show')
const { createUser } = require('../server/src/helpers/createUser')

// describe.only('API /GET show test', () => {

// })

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

  xit('GET /api/show all user shows', (done) => {
    request(server)
      .post('/api/auth/local')
      .send({ email: peter.email, password: 'peter' })
      .end((err, res) => {
        if (err) return done(err)

        let { token } = res.body

        User.findOne({ name: 'Peter' })
          .then(user => {
            let show = new Show({})
            user.shows.push(show)
            return Promise.all([
              show.save(),
              user.save()
            ])
          })
          .then(() => {
            request(server)
              .get('/api/show')
              .set('Authorization', `Bearer ${token}`)
              .end((err, res) => {
                if (err) return done(err)

                assert(res.body.length === 1)
                done()
              })
          })
      })
  })

  it('/POST add a show to user list', (done) => {
    request(server)
      .post('/api/auth/local')
      .send({ email: peter.email, password: 'peter' })
      .end((err, res) => {
        if (err) return done(err)

        let { token } = res.body
        request(server)
          .post('/api/show')
          .set('Authorization', `Bearer ${token}`)
          .send({ tmdbId: 1399, list: 'Watch List' })
          .end((err, res) => {
            if (err) return done(err)

            User.findOne({ email: peter.email })            
              .populate({
                path: 'shows',
                model: 'show',
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
                  .populate('lists')
                  .then(user => {
                    let watching = user.lists.find(l => l.name === 'Watching')
                    let watchlist = user.lists.find(l => l.name === 'Watch List')
                    assert(user.shows[0].list.name === 'Watching')
                    assert(watching.shows.length === 1)
                    assert(watchlist.shows.length === 0)
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
