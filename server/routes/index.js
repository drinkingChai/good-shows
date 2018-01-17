const router = require('express').Router()

router.use('/search', require('./search'))
router.use('/auth', require('./auth'))
router.use('/user', require('./user'))

module.exports = router
