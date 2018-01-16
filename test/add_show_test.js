const assert = require('assert')
const Show = require('../server/src/show')
const ShowData = require('../server/src/showData')
const User = require('../server/src/user')

describe('Show tests', () => {
  let got, peter, emilia

  beforeEach(done => {
    peter = new User({
      name: 'Peter Dinklage',
      email: 'peter@hand.com',
      password: 'dornishred'
    })

    emilia = new User({
      name: 'Emilia Clarke',
      email: 'emilia@queen.co',
      password: 'drakaris'
    })

    got = new ShowData({
      title: 'Game of Thrones',
      plot: 'Westeros',
      imdbID: 't1231423',
      posterPath: 'http://got.com'
    })

    show = new Show({
      showData: got
    })

    show2 = new Show({
      showData: got
    })

    peter.shows.push(show)
    emilia.shows.push(show2)

    Promise.all([
      got.save(),
      show.save(),
      show2.save(),
      peter.save(),
      emilia.save()
    ])
    .then(() => done())
    .catch(done)
  })

  it('can create a show with showData for user', done => {
    User.findOne({ name: 'Peter Dinklage' })
      .populate({
        path: 'shows',
        populate: {
          path: 'showData',
          model: 'showData'
        }
      })
      .then(user => {
        assert(user.name === 'Peter Dinklage')
        assert(user.shows.length === 1)
        assert(user.shows[0].showData.title === 'Game of Thrones')
        done()
      })
      .catch(done)
  })

  it('only creates one showData', done => {
    ShowData.find({ title: 'Game of Thrones' })
      .then(shows => {
        assert(shows.length === 1)
        done()
      })
      .catch(done)
  })

  it('creates a different show for each user', done => {
    User.find({})
      .then(users => {
        assert(users[0].shows[0] !== users[1].shows[0])
        done()
      })
      .catch(done)
  })
})
