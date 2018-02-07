const router = require('express').Router()
const { verifyMiddleware } = require('./helpers/token.helper')
const { parseSequelize } = require('./helpers/sequelize.helper')
const { User, Friends } = require('../../db')
const { Op } = require('sequelize')

router.get('/search', verifyMiddleware, (req, res, next) => {
  const userId = req.user.id
  const { input } = req.query
  let userFriendIds = {}

  Friends.findAll({
    where: { userId }
  })
  .then(friends => {
    userFriendIds = friends.reduce((obj, f) => {
      obj[f.friendId] = f.status
      return obj
    }, {})
  })
  .then(() =>
    User.findAll({
      where: {
        [Op.or]: [{
          name: { [Op.iRegexp]: input }
        }, {
          email: { [Op.iRegexp]: input }
        }],
        [Op.not]: { id: req.user.id }
      }
    })
  )
  .then(users => {
    let results = users.map(user => {
      let u = Object.assign({}, user.tokenData, { status: userFriendIds[user.id] || null }) // reusing token data for info
      return u
    })
    res.send(results)
  })
  .catch(next)
})

// get all friends
router.get('/', verifyMiddleware, (req, res, next) => {
  const userId = req.user.id

  Friends.findAll({
    where: { userId, status: 'friends' }
  })
  .then(friends => {
    let friendIds = friends.map(f => f.friendId)
    return User.findAll({
      where: { id: { [Op.in]: friendIds } }
    })
  })
  .then(users => {
    res.send(users.map(user => Object.assign({}, user.tokenData, { status: 'friends' }))) // reusing token data for info
  })
  .catch(next)
})

// get all friend requests
router.get('/requests', verifyMiddleware, (req, res, next) => {
  const userId = req.user.id

  Friends.findAll({
    where: { friendId: userId, status: 'pending' }
  })
  .then(friends => {
    let requestIds = friends.map(f => f.userId)
    return User.findAll({
      where: { id: { [Op.in]: requestIds } }
    })
  })
  .then(users => {
    res.send(users.map(user => Object.assign({}, user.tokenData, { status: 'pending' }))) // reusing token data for info
  })
  .catch(next)
})

// user making a request to another user
router.post('/request', verifyMiddleware, (req, res, next) => {
  const { friendId } = req.body
  const userId = req.user.id

  Friends.findOne({ where: { userId, friendId } })
  .then(rel => {
    if (rel && rel.status === 'pending') throw new Error('Friend request cannot be made twice')
    if (rel && rel.status === 'friends') throw new Error('Already on friend list')

    return Friends.create({ userId, friendId, status: 'pending' })
  })
  .then(() => res.sendStatus(200))
  .catch(next)
})

// other user accepting friend request
router.put('/confirm', verifyMiddleware, (req, res, next) => {
  const { friendId } = req.body
  const userId = req.user.id

  Friends.findOne({ where: { friendId: userId, userId: friendId, status: 'pending' } })
  .then(rel => {
    if (!rel) throw new Error('Invalid friend confirmation')

    Object.assign(rel, { status: 'friends' })

    return Promise.all([
      rel.save(),
      Friends.create({ userId, friendId, status: 'friends' })
    ])
  })
  .then(() => res.sendStatus(200))
  .catch(next)
})

module.exports = router