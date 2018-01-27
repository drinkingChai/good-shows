const router = require('express').Router()
const { verifyMiddleware } = require('./tokenHelpers')
const List = require('../src/list')

router.get('/', verifyMiddleware, (req, res, next) => {
  List.find({ user: req.user._id })
    .populate({
      path: 'shows',
      model: 'show',
      populate: {
        path: 'list',
        model: 'list'
      }
    })
    .then(lists => {
      res.send(lists)
    })
    .catch(next)
})

module.exports = router
