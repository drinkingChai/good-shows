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

router.get('/allshows', verifyMiddleware, (req, res, next) => {
  List.findOne({ user: req.user._id, name: 'All Shows' })
    .populate({
      path: 'shows',
      model: 'show',
      populate: {
        path: 'list',
        model: 'list'
      }
    })
    .then(list => {
      res.send(list.shows)
    })
    .catch(next)
})

router.get('/alllists', verifyMiddleware, (req, res, next) => {
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
      lists = lists.filter(l => l.name !== 'All Shows')
      res.send(lists)
    })
    .catch(next)
})

module.exports = router
