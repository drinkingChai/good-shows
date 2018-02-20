// notifications
const router = require('express').Router()
const { verifyMiddleware } = require('./helpers/token.helper')
const conn = require('../../db/conn')

router.get('/', verifyMiddleware, (req, res, next) => {
  const userId = req.user.id
  const friendId = userId

  Promise.all([
    conn.query(`SELECT users.id, users.name, users.email, friends.status FROM friends JOIN users ON friends."userId" = users.id WHERE friends."friendId" = ${friendId} AND status = 'pending'`),
    conn.query(`SELECT users.id, users.name, recomms.status, recomms.name as show_name FROM recomms JOIN users ON recomms."userId" = users.id WHERE recomms."friendId" = ${friendId} AND status = 'pending' OR status = 'seen'`)
  ])
  .then(([requests, recomms]) => {
    res.send({ requests: requests[0], recomms: recomms[0] })
  })
  .catch(next)
})

module.exports = router