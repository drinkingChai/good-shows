const assert = require('assert')
const server = require('../server')
const chai = require('chai')
chai.use(require('chai-http'))

describe.only('API popular shows test', () => {
  it('gets popular shows', (done) => {
    chai.request(server)
      .get('/api/popular')
      .end((err, res) => {
        if (err) return done(err)

        assert(res.body.page)
        assert(Array.isArray(res.body.results))
        done()
      })
  })
})
