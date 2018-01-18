const assert = require('assert')
const server = require('../server')
const chai = require('chai')
const qs = require('qs')
const ShowData = require('../server/src/showData')
const User = require('../server/src/user')
chai.use(require('chai-http'))

xdescribe('ADD show test', () => {
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

    peter.save()
      .then(() => done())
      .catch(done)
  })

  xit('/POST add a show to user list', (done) => {
    chai.request(server)
      .post('/api/auth/local')
      .send({ email: peter.email, password: 'peter' })
      .end((err, res) => {
        if (err) return done(err)

        let token = Object.entries(qs.parse(res.redirects[0]))[0][1]
        chai.request(server)
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
    chai.request(server)
      .post('/api/auth/local')
      .send({ email: peter.email, password: 'peter' })
      .end((err, res) => {
        if (err) return done(err)

        let token = Object.entries(qs.parse(res.redirects[0]))[0][1]

        chai.request(server)
          .post('/api/show')
          .set('Authorization', `Bearer ${token}`)
          .send({ tmdbId: 1399 })
          .end((err, res) => {
            if (err) return done(err)

            chai.request(server)
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
    chai.request(server)
      .post('/api/auth/local')
      .send({ email: peter.email, password: 'peter' })
      .end((err, res) => {
        if (err) return done(err)

        let token = Object.entries(qs.parse(res.redirects[0]))[0][1]

        chai.request(server)
          .post('/api/show')
          .set('Authorization', `Bearer ${token}`)
          .send({ tmdbId: 1399 })
          .end((err, res) => {
            if (err) return done(err)

            chai.request(server)
              .put('/api/show')
              .set('Authorization', `Bearer ${token}`)
              .send({ list: 'watching' })
              .end((err, res) => {
                if (err) return done(err)

                User.findOne({ email: peter.email })
                  .populate('shows')
                  .then(user => {
                    assert(user.shows[0].list === 'watching')
                    done()
                  })
                  .catch(done)
              })
          })
      })
  })

  xit('/PUT add/remove from favorites', (done) => {
    chai.request(server)
      .post('/api/auth/local')
      .send({ email: peter.email, password: 'peter' })
      .end((err, res) => {
        if (err) return done(err)

        let token = Object.entries(qs.parse(res.redirects[0]))[0][1]

        chai.request(server)
          .post('/api/show')
          .set('Authorization', `Bearer ${token}`)
          .send({ tmdbId: 1399 })
          .end((err, res) => {
            if (err) return done(err)

            chai.request(server)
              .put('/api/show')
              .set('Authorization', `Bearer ${token}`)
              .send({ favorite: true })
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
