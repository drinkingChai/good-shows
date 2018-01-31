const router = require('express').Router()
const { verifyMiddleware } = require('./helpers/token.helper')
const { searchSingleOptions } = require('./helpers/tmdb.helper')
const { User, Show, ShowItem } = require('../../db')

// get all user shows
router.get('/', verifyMiddleware, (req, res, next) => {
  ShowItem.findAll({
    where: { userId: req.user.id },
    include: {
      model: Show
    }
  })
  .then((showItems) => {
    res.send(showItems)
  })
  .catch(next)
})

router.post('/', verifyMiddleware, (req, res, next) => {
  const tmdbId = +req.body.tmdbId

  ShowItem.findOne({
    where: { userId: req.user.id },
    include: {
      model: Show,
      where: { tmdbId: +tmdbId }
    }
  })
  .then((show) => {
    // safety
    if (show) throw new Error('Show cannot be added twice!')
  })
  .then(() => Show.findOne({ tmdbId }))
  .then((show) => {
    if (show) return show

    return searchSingleOptions(process.env.TMDB_API_KEY, +tmdbId)
    .then((result) => Show.create(result))
  })
  .then((show) => ShowItem.create({ showId: show.id, userId: +req.user.id }))
  .then(() => {
    res.sendSatus(200)
  })
  .catch(next)
})

router.put('/:id', verifyMiddleware, (req, res, next) => {
  ShowItem.findById(req.params.id)
  .then((showItem) => {
    Object.assign(showItem, req.body)
    return showItem.update()
  })
  .catch(next)
})

module.exports = router