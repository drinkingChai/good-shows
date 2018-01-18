const router = require('express').Router()
const User = require('../src/user')
const Show = require('../src/show')
const { verifyMiddleware } = require('./tokenHelpers')

router.post('/', verifyMiddleware, (req, res, next) => {
  User.findById(req.user._id)
    .then(user => {
      let isFriends = user.friends.find(friend => friend.toString() === req.body.onUser)
      if (!isFriends) throw new Error('User not on friend list.')

      Show.findById(req.body.showId)
        .then(show => {
          show.likes.push(user)
          return show.save()
        })
        .then(() => {
          res.sendStatus(200)
        })
        .catch(next)
    })
    .catch(next)
})

router.delete('/', verifyMiddleware, (req, res, next) => {
  Show.findById(req.body.showId)
    .then(show => {
      if (!show) throw new Error('Show not found.')

      show.likes = show.likes.filter(user => user.toString() !== req.user._id)
      return show.save()
    })
    .then(() => res.sendStatus(200))
    .catch(next)
})

module.exports = router
