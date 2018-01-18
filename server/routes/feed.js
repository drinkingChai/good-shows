const router = require('express').Router()
const User = require('../src/user')
const { verifyMiddleware } = require('./tokenHelpers')

router.get('/', verifyMiddleware, (req, res, next) => {
  User.findById(req.user._id)
    .populate({
      path: 'friends',
      populate: {
        path: 'shows',
        model: 'show'
      }
    })
    .then(user => {
      let recents = []

      user.friends.forEach(friend => {
        friend.shows.sort((a, b) => b.updatedAt > a.updatedAt)
        recents.push(friend.shows.shift())
      })

      user.friends.forEach(friend => {
        recents = recents.concat(friend.shows)
      })

      res.send(recents)
    })
    .catch(next)
})

module.exports = router
