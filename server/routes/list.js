const router = require('express').Router()
const { verifyMiddleware } = require('./tokenHelpers')
const User = require('../src/user')

router.get('/', verifyMiddleware, (req, res, next) => {
  User.findById(req.user._id)
    .populate({
      path: 'lists',
      model: 'list',
      populate: {
        path: 'shows',
        model: 'show'
      }
    })
    .then(user => {
      res.send(user.lists)
    })
    .catch(next)
})

module.exports = router
