const assert = require('assert')
const User = require('../server/src/user')

describe('User validation', () => {
  it('requires name', () => {
    const peter = new User({
      email: 'peter@hand.com',
      password: 'dornishred'
    })

    const validationResult = peter.validateSync()
    const { message } = validationResult.errors.name

    assert(message === 'Name is required.')
  })

  it('requires email', () => {
    const peter = new User({
      name: 'Peter Dinklage',
      password: 'dornishred'
    })

    const validationResult = peter.validateSync()
    const { message } = validationResult.errors.email

    assert(message === 'Email is required.')
  })

  it('requires password', () => {
    const peter = new User({
      name: 'Peter Dinklage',
      email: 'peter@hand.com'
    })

    const validationResult = peter.validateSync()
    const { message } = validationResult.errors.password

    assert(message === 'Password is required.')
  })

  it('password is hashed, and doesn\'t match the string password', done => {
    let password = 'dornishred'
    const peter = new User({
      name: 'Peter Dinklage',
      email: 'peter@hand.com',
      password
    })

    peter.save()
      .then(() => User.findOne({ email: 'peter@hand.com' }))
      .then(user => {
        assert(user.password !== password)
        done()
      })
      .catch(done)
  })

  it('can return only token data', (done) => {
    let password = 'dornishred'
    const peter = new User({
      name: 'Peter Dinklage',
      email: 'peter@hand.com',
      password
    })

    peter.save()
      .then(() => User.findOne({ email: 'peter@hand.com' }))
      .then(user => {
        let tokenData = user.tokenData 
        assert(tokenData.name === 'Peter Dinklage')
        assert(!tokenData.password)
        done()
      })
      .catch(done)
  })
})

