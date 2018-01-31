const request = require('request-promise')

const searchTv = (api_key, query = '', page = 1) => {
  let options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/tv`,
    qs: {
      query: query,
      page: page,
      language: 'en-US',
      api_key: api_key
    },
    body: '{}'
  }

  return request(options)
  .then(JSON.parse)
}

const getTvDetails = (api_key, tmdbId) => {
  let options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/tv/${tmdbId}`,
    qs: {
      language: 'en-US',
      api_key: api_key
    },
    body: '{}'
  }

  return request(options)
  .then(JSON.parse)
}

module.exports = {
  searchTv,
  getTvDetails 
}