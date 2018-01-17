const assert = require('assert')
const server = require('../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

xdescribe('API Search test', () => {
  // search function with debounce
  // NOTES: debouce time of 500ms limites to 20 requests per IP address
  //        which is under the 40 second rate limit of TMDB

  it('/GET search with query', (done) => {
    chai.request(server)
      .get('/api/search?name=game')
      .end((err, res) => {
        if (err) return done(err)

        assert(res.status === 200)
        assert(Array.isArray(res.body.results))
        assert(res.body.results[0].original_name === 'Game of Thrones')
        done()
      })
  })

  it('/GET search with query and page', (done) => {
    chai.request(server)
      .get('/api/search?name=game&page=2')
      .end((err, res) => {
        if (err) return done(err)

        assert(res.status === 200)
        assert(res.body.page === 2)
        done()
      })
  })
})
