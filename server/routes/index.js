const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/search', require('./search'))
router.use('/shows', require('./shows'))

module.exports = router