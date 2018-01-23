const router = require('express').Router()
const Comment = require('../src/comment')
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
          let comment = new Comment({
            user,
            content: req.body.content
          })

          show.comments.push(comment)
          return Promise.all([
            comment.save(),
            show.save()
          ])
        })
        .then(() => {
          res.sendStatus(200)
        })
        .catch(next)
    })
    .catch(next)
})

router.delete('/', verifyMiddleware, (req, res, next) => {
  Comment.findById(req.body.commentId)
    .then(comment => {
      if (!comment) throw new Error('Comment not found.')
      if (comment.user.toString() !== req.user._id.toString()) return res.sendStatus(401)

      Show.findById(req.body.showId)
        .then(show => {
          show.comments = show.comments.filter(c => c.toString() !== req.body.commentId)
          return show.save()
        })
        .then(() => Comment.findByIdAndRemove(comment._id))
        .then(() => res.sendStatus(200))
    })
    .catch(next)
})

module.exports = router
