const router = require('express').Router()

router.use('/search', require('./search'))
router.use('/auth', require('./auth'))
router.use('/friend', require('./friend'))
router.use('/show', require('./show'))

module.exports = router
