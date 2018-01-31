const router = require('express').Router()
const request = require('request-promise')
const { verifyMiddleware } = require('./tokenHelpers')

// ************************ TMDB search options ************************ //
const searchMultiOptions = (api_key, query = '', page = 1) => ({
  method: 'GET',
  url: `https://api.themoviedb.org/3/search/tv`,
  qs: {
    query: query,
    page: page,
    language: 'en-US',
    api_key: api_key
  },
  body: '{}'
})

const searchSingleOptions = (api_key, tmdbId) => ({
  method: 'GET',
  url: `https://api.themoviedb.org/3/tv/${tmdbId}`,
  qs: {
    language: 'en-US',
    api_key: 'cb6cf52a5651e47f6e764611e78fa7ab'
  },
  body: '{}'
})
// ************************ TMDB search options ************************ //


router.get('/:tmdbId', verifyMiddleware, (req, res, next) => {
  const { tmdbId } = req.params
  let options = searchSingleOptions(process.env.TMDB_API_KEY, tmdbId)

  if (!tmdbId) return res.send({})

  request(options)
  .then(result => {
    res.send(JSON.parse(result))
  })
  .catch(next)
})

router.get('/', (req, res, next) => {
  const { name, page } = req.query
  let options = searchMultiOptions(process.env.TMDB_API_KEY, name, +page)

  if (!name) return res.send({
    page: '1',
    total_pages: '1',
    results: []
  })

  request(options)
  .then(results => {
    res.send(JSON.parse(results))
  })
  .catch(next)
})

module.exports = router