const router = require('express').Router()
const { verifyMiddleware } = require('./helpers/token.helper')
const { searchSingleOptions, searchMultiOptions } = require('./helpers/tmdb.helper')

router.get('/:tmdbId', verifyMiddleware, (req, res, next) => {
  const { tmdbId } = req.params

  if (!tmdbId) return res.send({})

  searchSingleOptions(process.env.TMDB_API_KEY, tmdbId)
  .then((results) => {
    res.send(results)
  })
  .catch(next)
})

router.get('/', (req, res, next) => {
  const { name, page } = req.query

  if (!name) return res.send({
    page: '1',
    total_pages: '1',
    results: []
  })

  searchMultiOptions(process.env.TMDB_API_KEY, name, +page)
  .then(results => {
    res.send(results)
  })
  .catch(next)
})

module.exports = router