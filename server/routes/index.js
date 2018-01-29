const router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/search', require('./search'))

module.exports = router
