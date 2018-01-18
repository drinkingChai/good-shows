const router = require('express').Router()
const request = require('request-promise')

let options = {
 method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/tv',
  qs: 
   { include_null_first_air_dates: 'false',
     timezone: 'America/New_York',
     page: '1',
     sort_by: 'popularity.desc',
     language: 'en-US',
     api_key: '' },
  body: '{}' 
}

router.get('/', (req, res, next) => {
  options.qs.api_key = process.env.TMDB_API_KEY

  request(options)
    .then(results => {
      res.send(JSON.parse(results))
    })
    .catch(next)
})

module.exports = router
