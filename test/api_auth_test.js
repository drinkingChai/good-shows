const assert = require('assert')
const server = require('../server')
const chai = require('chai')
const User = require('../server/src/user')
chai.use(require('chai-http'))

xdescribe('API local auth test', () => {
  // login/logout local
  let peter

  beforeEach((done) => {
    let peter = new User({
      name: 'Peter',
      email: 'peter@hand.com',
      password: 'peter'
    })

    peter.save()
      .then(() => done())
      .catch(done)
  })

  it('can log in an existing user', (done) => {
    chai.request(server)
      .post('/api/auth/local')
      .send({ email: 'peter@hand.com', password: 'peter' })
      .end((err, res) => {
        if (err) return done(err)

        assert(res.status === 200)
        assert(res.redirects.length === 1)
        done()
      })
  })

  it('can can verify a user is logged in', () => {
    chai.request(server)
      .post('/api/auth/verify')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGV0ZXIiLCJlbWFpbCI6InBldGVyQGhhbmQuY29tIiwic2hvd3MiOltdLCJmcmllbmRzIjpbXSwiaWF0IjoxNTE2MjEzMTA1fQ.Pjax9OQ1ixKgKJyqaBUAVld0qIxjWKbLDThtBmfLBYg')
      .send({})
      .end((err, res) => {
        if (err) return done(err)

        assert(res.status === 200)
        assert(res.body.name === 'Peter')
        assert(!res.body.password)
        done()
      }) 
  })
})

xdescribe('API create user test', () => {
  it('can create a new user and log them in', (done) => {
    chai.request(server)
      .post('/api/auth/new')
      .send({ name: 'Podrick', email: 'pod@payne.co', password: 'podlikespies' })
      .end((err, res) => {
        if (err) return done(err)

        assert(res.redirects.length === 1)
      
        User.findOne({ name: 'Podrick' })
          .then(user => {
            assert(!user.isNew)
            assert(user.password !== 'podlikespies')
            done() 
          })
          .catch(done)
      })
  })
})
