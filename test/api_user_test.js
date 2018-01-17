const assert = require('assert')
const server = require('../server')
const chai = require('chai')
const qs = require('qs')
const User = require('../server/src/user')
chai.use(require('chai-http'))

describe.only('API user test', () => {
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
          .post('/api/user/add-request')
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
