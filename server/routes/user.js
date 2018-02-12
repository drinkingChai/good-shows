const router = require('express').Router()
const { verifyMiddleware, createToken } = require('./helpers/token.helper')
const { User } = require('../../db')

router.put('/password', verifyMiddleware, (req, res, next) => {
  const { currentpass, newpass } = req.body

  User.findById(req.user.id)
  .then(user => user.changePassword(currentpass, newpass))
  .then(user => res.send({ userInfo: user.tokenData, token: createToken(user.tokenData) }))
  .catch(next)
})

router.put('/', verifyMiddleware, (req, res, next) => {
  User.findById(req.user.id)
  .then(user => {
    Object.assign(user, req.body)
    return user.save()
  })
  .then(user => res.send({ userInfo: user.tokenData, token: createToken(user.tokenData) }))
  .catch(next)
})

module.exports = router