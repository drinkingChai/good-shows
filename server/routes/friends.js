const router = require('express').Router()
const { verifyMiddleware } = require('./helpers/token.helper')
const { User, Friends } = require('../../db')
const { Op } = require('sequelize')

router.get('/search', verifyMiddleware, (req, res, next) => {
  const { input } = req.query

  User.findAll({
    where: {
      [Op.or]: [{
        name: { [Op.iRegexp]: input }
      }, {
        email: { [Op.isRegexp]: input }
      }]
    }
  })
  .then(res.send)
  .catch(next)
})

// user making a request to another user
router.post('/request', verifyMiddleware, (req, res, next) => {
  const { friendId } = req.body
  const userId = req.user.id

  Friends.findOne({ where: { userId, friendId } })
  .then(rel => {
    if (rel && rel.status === 'pending') throw new Error('Request cannot be made twice')
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