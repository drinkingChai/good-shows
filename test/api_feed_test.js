// see friend feed
const assert = require('assert')
// const server = require('../server')
const chai = require('chai')
const qs = require('qs')
const Show = require('../server/src/show')
const User = require('../server/src/user')
chai.use(require('chai-http'))

xdescribe('API feed test', () => {
  let peter, emilia, kit, show, show2

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

    kit = new User({
      name: 'Kit',
      email: 'kit@snow.org',
      password: 'wolf'
    })

    show = new Show({})
    show2 = new Show({})
    peter.shows.push(show)
    peter.shows.push(show2)
    kit.shows.push(show)
    emilia.friends.push(peter)
    emilia.friends.push(kit)

    Promise.all([
      show.save(),
      show2.save(),
      peter.save(),
      emilia.save(),
      kit.save()
    ])
    .then(() => done())
    .catch(done)
  })

  it('shows have timestamps', () => {
    assert(show.createdAt)
    assert(show.updatedAt)
  })

  it('/GET friend feed', (done) => {
    // shows most recent from each user first
    // then older feed
    chai.request(server)
      .post('/api/auth/local')
      .send({ email: 'emilia@dragon.com', password: 'dragon' })
      .end((err, res) => {
        if (err) return done(err)

        let token = Object.entries(qs.parse(res.redirects[0]))[0][1]

        chai.request(server)
          .get('/api/feed')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            if (err) done(err)

            assert(Array.isArray(res.body))
            assert(res.body.length === 3)
            done()
          })
      })
  })
})
