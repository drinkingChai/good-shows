const assert = require('assert')
const User = require('../server/src/user')
const List = require('../server/src/list')
const Show = require('../server/src/show')
const { createUser } = require('../server/src/helpers/createUser')

xdescribe('List test', () => {
  let show, peter

  beforeEach((done) => {
    show = new Show({})
    peter = new User({
      name: 'Peter',
      email: 'peter@dragon.com',
      password: 'peter',
      shows: []
    })

    Promise.all([
      show.save(),
      createUser(peter)
    ])
    .then(() => done())
    .catch(done)
  })

  it('has 3 default lists', (done) => {
    User.findOne({ name: 'Peter' })
      .then(user => {
        assert(user.lists.length === 3)
        done()
      })
      .catch(done)
  })

  it('can add a show to default list', (done) => {
    User.findOne({ name: 'Peter' })
      .populate({
        path: 'defaultList',
        model: 'list'
      })
      .then(user => {
        user.shows.push(show),
        user.defaultList.shows.push(show)

        return Promise.all([
          user.save(),
          user.defaultList.save()
        ])
      })
      .then(() => {
        return User.findOne({ name: 'Peter' })
          .populate({
            path: 'defaultList',
            model: 'list'
          })  
      })
      .then(user => {
        assert(user.shows.length === 1)
        assert(user.defaultList.shows.length === 1)
        done()
      })
      .catch(done)
  })
})
