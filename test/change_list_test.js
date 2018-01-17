const assert = require('assert')
const Show = require('../server/src/show')
const ShowData = require('../server/src/showData')
const User = require('../server/src/user')

describe('Change list tests', () => {
  let got, peter

  beforeEach(done => {
    peter = new User({
      name: 'Peter Dinklage',
      email: 'peter@hand.com',
      password: 'dornishred'
    })

    got = new ShowData({
      name: 'Game of Thrones',
      overview: 'Westeros',
      tmdbID: 't1231423',
      posterPath: 'http://got.com'
    })

    show = new Show({
      favorite: true,
      showData: got
    })

    peter.shows.push(show)

    Promise.all([
      got.save(),
      show.save(),
      peter.save(),
    ])
    .then(() => done())
    .catch(done)
  })

  it('saves by default to wantToWatch list', () => {
    assert(show.list === 'wantToWatch')
  })

  it('can change to watching list', done => {
    show.list = 'watching'
    show.save()
      .then(result => {
        assert(result.list === 'watching')
        done()
      })
      .catch(done)
  })

  it('can\'t change to an invalid list name', done => {
    show.list = 'unknown!'
    show.save()
      .catch(validationResult => {
        const { message } = validationResult.errors.list
        
        assert(message === 'Invalid list.')
        done()
      })
  })

  it('can be removed from favorites', done => {
    show.favorite = false 
    show.save()
      .then(result => {
        assert(result.favorite === false)
        done()
      })
      .catch(done)
  })

  it('can list all favorite shows', () => {
    assert(peter.shows.filter(s => s.favorite).length === 1)
  })

  it('can list only shows in wantToWatch list', () => {
    assert(peter.shows.filter(s => s.list === 'wantToWatch').length === 1)
  })

})