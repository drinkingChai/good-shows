const assert = require('assert')
const server = require('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const ShowData = require('../server/src/showData')
const User = require('../server/src/user')
chai.use(chaiHttp)

xdescribe('ADD show test', () => {
  // add, remove
  // add/remove favorite
  // change list
  let peter

  beforeEach((done) => {
    peter = new User({
      name: 'Peter',
      email: 'peter',
      password: 'peter'
    })

    peter.save()
      .then(() => done())
      .catch(done)
  })

  // it.only('/POST add a show to user list', (done) => {
  //   chai.request(server)
  //     .post('/api/shows')
  //     .send({ tmdbId: 1399 })
  //   done()
  // })
})
