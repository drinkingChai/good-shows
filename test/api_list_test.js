const assert = require('assert')
const request = require('supertest')
const server = require('../server')
const Show = require('../server/src/show')
const User = require('../server/src/user')
const { createUser } = require('../server/src/helpers/createUser')

xdescribe('API list test', () => {
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

  xit('GET /api/list - gets all lists of user', (done) => {
    request(server)
      .post('/api/auth/local')
      .send({ email: peter.email, password: 'peter' })
      .end((err, res) => {
        if (err) return done(err)

        let { token } = res.body

        request(server)
          .get('/api/list')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            if (err) done(err)

            assert(res.body.length === 3)
            done()
          })
      })
  })

  xit('POST /api/list - creates a new list', (done) => {
    request(server)
      .post('/api/auth/local')
      .send({ email: peter.email, password: 'peter' })
      .end((err, res) => {
        if (err) done(err)

        let { token } = res.body

        request(server)
          .post('/api/list')
      })
  })

  it('PUT /api/list - change list properties', (done) => {
    done()
  })

  it('DELETE /api/list - remove a list and all shows in it', (done) => {
    done()
  })
})
