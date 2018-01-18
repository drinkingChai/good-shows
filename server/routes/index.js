const router = require('express').Router()

router.use('/search', require('./search'))
router.use('/auth', require('./auth'))
router.use('/friend', require('./friend'))
router.use('/show', require('./show'))
router.use('/like', require('./like'))
router.use('/comment', require('./comment'))
router.use('/feed', require('./feed'))

module.exports = router
