const router = require('express').Router()
const { verifyMiddleware } = require('./helpers/token.helper')
const { User, Show, ShowItem } = require('../../db')

// get all user shows
router.get('/', verifyMiddleware, (req, res, next) => {
  ShowItem.findAll({
    where: { userId: req.user.id },
    include: {
      model: Show
    },
    order: [['createdAt', 'ASC']]
  })
  .then((showItems) => {
    res.send(showItems)
  })
  .catch(next)
})

router.post('/', verifyMiddleware, (req, res, next) => {
  const tmdbId = +req.body.show.id

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
  .then(() => Show.findOne({ where: { tmdbId } }))
  .then((show) => {
    if (show) return show

    const { first_air_date, vote_average, poster_path } = req.body.show
    Object.assign(req.body.show, { first_air_date, vote_average, poster_path, tmdbId })

    delete req.body.show.id

    return Show.create(req.body.show)
  })
  .then((show) => ShowItem.create({ showId: show.id, userId: +req.user.id }))
  .then(() => {
    res.sendStatus(200)
  })
  .catch(next)
})

router.put('/:id', verifyMiddleware, (req, res, next) => {
  ShowItem.findById(req.params.id)
  .then((showItem) => {
    Object.assign(showItem, req.body.show)
    return showItem.save()
  })
  .then(() => res.sendStatus(200))
  .catch(next)
})

module.exports = router