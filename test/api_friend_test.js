const assert = require('assert')
const server = require('../server')
const chai = require('chai')
const qs = require('qs')
const User = require('../server/src/user')
chai.use(require('chai-http'))

xdescribe('API user test', () => {
  let peter, emilia

  beforeEach((done) => {
    peter = new User({
      name: 'Peter',
      email: 'peter@dragon.com',
      password: 'peter'
    })

    emilia = new User({
      name: 'Emilia',
      email: 'emilia@dragon.com',
      password: 'dragon'
    })

    Promise.all([
      peter.save(),
      emilia.save()
    ])
    .then(() => done())
    .catch(done)
  })

  it('can add a user as a friend', (done) => {
    chai.request(server)
      .post('/api/auth/local')
      .send({ email: 'peter@dragon.com', password: 'peter' })
      .end((err, res) => {
        if (err) return done(err)

        let token = Object.entries(qs.parse(res.redirects[0]))[0][1]

        chai.request(server)
          .post('/api/friend/add-request')
          .set('Authorization', `Bearer ${token}`)
          .send({ email: 'emilia@dragon.com' })
          .end((err, res) => {
            if (err) return done(err)

            User.findOne({ email: 'emilia@dragon.com' })
              .then(user => {
                assert(user.pendingFriends.length === 1)
                assert(user.pendingFriends[0].toString() === peter._id.toString())
                done()
              })
              .catch(done)
          })
      })
  })
})

xdescribe('API add friends', () => {
  let peter, emilia

  beforeEach((done) => {
    peter = new User({
      name: 'Peter',
      email: 'peter@dragon.com',
      password: 'peter'
    })

    emilia = new User({
      name: 'Emilia',
      email: 'emilia@dragon.com',
      password: 'dragon'
    })

    emilia.pendingFriends.push(peter)

    Promise.all([
      peter.save(),
      emilia.save()
    ])
    .then(() => done())
    .catch(done)
  })

  it('can confirm adding a friend', (done) => {
    // bi-directional add
    // users appear in each other's friend list
    chai.request(server)
      .post('/api/auth/local')
      .send({ email: 'emilia@dragon.com', password: 'dragon' })
      .end((err, res) => {
        if (err) return done(err)

        let token = Object.entries(qs.parse(res.redirects[0]))[0][1]

        chai.request(server)
          .put('/api/friend/add-friend')
          .set('Authorization', `Bearer ${token}`)
          .send({ email: 'peter@dragon.com' })
          .end((err, res) => {
            if (err) return done(err) 

            User.findOne({ email: 'emilia@dragon.com' })
              .then(user => {
                assert(user.friends[0].toString() === peter._id.toString())
              })
              .then(() => User.findOne({ email: 'peter@dragon.com' }))
              .then(user => {
                assert(user.friends[0].toString() === emilia._id.toString())
                done()
              })
              .catch(done)
          })
      })
  })
})

xdescribe('API remove friends', () => {
  let peter, emilia

  beforeEach((done) => {
    peter = new User({
      name: 'Peter',
      email: 'peter@dragon.com',
      password: 'peter'
    })

    emilia = new User({
      name: 'Emilia',
      email: 'emilia@dragon.com',
      password: 'dragon'
    })

    emilia.friends.push(peter)
    peter.friends.push(emilia)

    Promise.all([
      peter.save(),
      emilia.save()
    ])
    .then(() => done())
    .catch(done)
  })

  it('can remove a friend', (done) => {
    // bi-directional remove
    // users are removed from each other's friend list
    chai.request(server)
      .post('/api/auth/local')
      .send({ email: 'emilia@dragon.com', password: 'dragon' })
      .end((err, res) => {
        if (err) return done(err)

        let token = Object.entries(qs.parse(res.redirects[0]))[0][1]

        chai.request(server)
          .put('/api/friend/remove-friend')
          .set('Authorization', `Bearer ${token}`)
          .send({ email: 'peter@dragon.com' })
          .end((err, res) => {
            if (err) return done(err) 

            User.findOne({ email: 'emilia@dragon.com' })
              .then(user => {
                assert(user.friends.length === 0)
                assert(user.pendingFriends.length === 0)
              })
              .then(() => User.findOne({ email: 'peter@dragon.com' }))
              .then(user => {
                assert(user.friends.length === 0)
                assert(user.pendingFriends.length === 0)
                done()
              })
              .catch(done)
          })
      })
  })
})
