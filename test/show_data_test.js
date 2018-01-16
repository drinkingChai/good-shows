const assert = require('assert')
const ShowData = require('../server/src/showData')

describe('ShowData test', () => {
  it('has genres initialized to empty array', () => {
    let got = new ShowData({
      title: 'Game of Thrones',
      plot: 'Westeros',
      imdbID: 't1231423',
      posterPath: 'http://got.com'
    })

    assert(got.genres.length === 0)
  })
})
