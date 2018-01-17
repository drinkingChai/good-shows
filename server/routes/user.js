const router = require('express').Router()
const User = require('../src/user')
const { verifyMiddleware } = require('./tokenHelpers')

router.post('/add-request', verifyMiddleware, (req, res, next) => {
  // user receiving request
  User.findOne({ email: req.body.email })
    .populate('friends', 'pendingFriends')
    .then(user => {
      if (!user) throw new Error('User with email not found.')

      User.findOne({ email: req.user.email })
        .then(reqUser => {
          // user making request 
          let inFriends = user.friends.filter(friend => friend._id.toString() === reqUser._id.toString()).length
          let inRequests = user.pendingFriends.filter(friend => friend._id.toString() === reqUser._id.toString()).length

          if (!inFriends && !inRequests) {
            user.pendingFriends.push(reqUser)
            return user.save()
              .then(() => res.sendStatus(200))
              .catch(next)
          }
          res.sendStatus(200)
        })
    })
    .catch(next)
})

router.put('/add-friend', verifyMiddleware, (req, res, next) => {

})

router.put('/remove-friend', verifyMiddleware, (req, res, next) => {
  
})

router.post('/invite', verifyMiddleware, (req, res, next) => {
  // email invite a friend
})

module.exports = router
