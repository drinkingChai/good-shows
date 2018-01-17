const assert = require('assert')
const User = require('../server/src/user')

describe('Friend test', () => {
  let peter, emilia, kit

  beforeEach(done => {
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

    Promise.all([
      peter.save(),
      emilia.save(),
      kit.save()
    ])
    .then(() => done())
    .catch(done)
  })

  it('can search users by email', () => {
    // TODO: search
  })

  it('can add a friend', done => {
    peter.friends.push(emilia)
    emilia.friends.push(peter)

    Promise.all([emilia.save(), peter.save()])
      .then(() => {
        return User.findOne({ name: 'Peter' })
          .populate('friends')
      })
      .then(user => {
        assert(user.friends[0].name === 'Emilia')
        return User.findOne({ name: 'Emilia' })
          .populate('friends')
      })
      .then(user => {
        assert(user.friends[0].name === 'Peter')
        done()
      })
      .catch(done)
  })

  it('can remove a friend', done => {
    peter.friends.push(emilia)
    emilia.friends.push(peter) 

    Promise.all([emilia.save(), peter.save()])
      .then(() => {
        return User.findOne({ name: 'Peter' })
          .populate('friends')
      })
      .then(user => {
        user.friends = user.friends.filter(friend => friend.name !== 'Emilia')
        return user.save()
      })
      .then(() => User.findOne({ name: 'Peter' }))
      .then(user => {
        assert(user.friends.length === 0)
        done()
      })
      .catch(done)
  })
})
