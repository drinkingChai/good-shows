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

        return done(null, createToken(userTokenData))
      })
      .catch(err => {
        return done(null, false, err)
      })
  }
))

router.post('/local', (req, res, next) => {
  passport.authenticate('local', function(err, token, info) {
    if (err) return next(err)

    if (!token) return res.redirect('/login?error=1')

    res.redirect(`/token?=${token}`)
  })(req, res, next)
})

router.post('/verify', (req, res, next) => {
  verifyToken(req.headers.authorization)
    .then(result => {
      res.send(result)
    })
    .catch(next)
})

module.exports = router
