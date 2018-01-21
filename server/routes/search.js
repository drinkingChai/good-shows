const router = require('express').Router()
const request = require('request-promise')

let options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/search/tv',
  qs: {
    query: '',
    language: 'en-US',
    api_key: ''
  },
  body: '{}'
}

router.get('/', (req, res, next) => {
  options.qs.api_key = process.env.TMDB_API_KEY
  options.qs.query = req.query.name
  options.qs.page = req.query.page

  if (!req.query.name) return res.send({
    page: '1',
    total_pages: '1',
    results: []
  })

  request(options)
    .then(searchResults => {
      res.send(JSON.parse(searchResults))
    })
    .catch(next)
})

module.exports = router
