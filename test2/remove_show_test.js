const assert = require('assert')
const Show = require('../server/src/show')
const ShowData = require('../server/src/showData')
const User = require('../server/src/user')

xdescribe('Change list tests', () => {
  let got, peter, show

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

  it('can remove a show', done => {
    User.findOne({ name: 'Peter Dinklage' }) 
      .populate({
        path: 'shows',
        populate: {
          'path': 'showData',
          'model': 'showData'
        }
      })
      .then(user => {
        user.shows = user.shows.filter(s => s.showData.name !== 'Game of Thrones')

        return Promise.all([
          show.remove(),
          user.save()   
        ])
      })
      .then(() => User.findOne({ name: 'Peter Dinklage' }))
      .then(user => {
        assert(user.shows.length === 0)
      })
      .then(() => Show.findById(show._id))
      .then(_show => {
        assert(_show === null)
        done()
      })
      .catch(done)
  })
})
