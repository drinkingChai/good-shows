const assert = require('assert')
const ShowData = require('../server/src/showData')
const server = require('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

describe('API Search test', () => {
  // search function with debounce
  // NOTES: debouce time of 500ms limites to 20 requests per IP address
  //        which is under the 40 second rate limit of TMDB

  it.only('/GET search with query', (done) => {
    chai.request(server)
      .get('/api/search?title=game')
      .end((err, res) => {
        if (err) return done(err)

        assert(res.status === 200)
        assert(Array.isArray(res.body.results))
        assert(res.body.results[0].original_name === 'Game of Thrones')
        done()
      })
  })
})
