const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/search', require('./search'))
router.use('/shows', require('./shows'))
router.use('/friends', require('./friends'))
router.use('/user', require('./user'))
router.use('/recomms', require('./recomms'))

module.exports = router