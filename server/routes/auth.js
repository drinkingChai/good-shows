const router = require('express').Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../src/user')
const { createToken, verifyToken } = require('./tokenHelpers')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.verifyLogin(email, password)
      .then(userTokenData => {
        if (!userTokenData) return done(null, false, 'Incorrect username or password.')

        return done(null, { userInfo: userTokenData, token: createToken(userTokenData) })
      })
      .catch(err => {
        return done(null, false, err)
      })
  }
))

router.post('/local', (req, res, next) => {
  passport.authenticate('local', function(err, token, info) {
    if (err) return next(err)

    if (!token) return next(info)

    res.send(token)
  })(req, res, next)
})

router.post('/verify', (req, res, next) => {
  verifyToken(req.headers.authorization)
    .then(result => {
      res.send(result)
    })
    .catch(next)
})

router.post('/new', (req, res, next) => {
  const { name, email, password } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) throw new Error('An account is already registered with that email.')

      let newUser = new User({ name, email, password })
      return newUser.save()
    })
    .then(user => {
      res.send({ userInfo: tokenData, token: createToken(user.tokenData) })
    })
    .catch(next)
})

module.exports = router
