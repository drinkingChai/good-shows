const router = require('express').Router()
const Show = require('../src/show')
const ShowData = require('../src/showData')
const User = require('../src/user')
const request = require('request-promise')
const { verifyMiddleware } = require('./tokenHelpers')

let options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/tv/',
  qs: {
    language: 'en-US',
    api_key: ''
  },
  body: '{}'
}

router.post('/', verifyMiddleware, (req, res, next) => {
  // add to a list
  // find in ShowData, if not
  // search TMDB api, add to ShowData
  ShowData.findOne({ tmdbId: req.body.tmdbId })
    .then(showData => {
      if (showData) return showData

      options.qs.api_key = process.env.TMDB_API_KEY
      options.url = options.url + req.body.tmdbId

      return request(options)
        .then(result => {
          const { name, overview, genres, first_air_date, vote_average, poster_path, id } = JSON.parse(result)
          let newShowData = new ShowData({
            name,
            overview,
            genres,
            tmdbId: id,
            posterPath: poster_path,
            voteAverage: vote_average,
            firstAirDate: first_air_date
          })

          return newShowData.save()
        })
        .then(showData => {
          let newShow = new Show({
            showData
          })

          return newShow.save()
        })
        .then(show => {
          return User.findOne({ email: req.user.email })
            .then(user => {
              user.shows.push(show)
              return user.save()
            })
        })
        .then(() => {
          res.sendStatus(200)
        })
        .catch(next)
    })
    .catch(next)
})

router.delete('/', verifyMiddleware, (req, res, next) => {
  // remove from lists
  User.findOne({ email: req.user.email })
    .populate({
      path: 'shows',
      populate: {
        path: 'showData',
        model: 'showData'
      }
    })
    .then(user => {
      let show = user.shows.find(show => show.showData.tmdbId === +req.body.tmdbId)
      user.shows = user.shows.filter(show => show.showData.tmdbId !== +req.body.tmdbId)

      return Promise.all([
        show.remove(),
        user.save()   
      ])
    })
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put('/', verifyMiddleware, (req, res, next) => {
  // change list, add/remove from favorites
  User.findOne({ email: req.user.email })
    .populate({
      path: 'shows',
      populate: {
        path: 'showData',
        model: 'showData'
      }
    })
    .then(user => {
      let show = user.shows.find(show => show.showData.tmdbId !== +req.body.tmdbId)
      show = Object.assign(show, req.body)

      return show.save()
    })
    .then(() => res.sendStatus(200))
    .catch(next)
})

module.exports = router
