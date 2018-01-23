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
    })
    .then(showData => {
      let newShow = new Show({
        showData
      })

      return newShow.save()
    })
    .then(show => {
      return User.findOne({ email: req.user.email })
        .populate({ path: 'lists', model: 'list' })
        .populate({ path: 'defaultList', model: 'list' })
        .then(user => {
          user.shows.push(show)
          let listName = req.body.listName || user.defaultList.name
          let list = user.lists.find(l => l.name === listName)
          show.list = list
          list.shows.push(show)
          
          return Promise.all([
            show.save(),
            list.save(),
            user.save()
          ])
        })
    })
    .then(() => {
      res.sendStatus(200)
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

router.put('/list', verifyMiddleware, (req, res, next) => {
  // change list
  User.findOne({ email: req.user.email })
    .populate({
      path: 'shows',
      model: 'show',
      populate: {
        path: 'showData',
        model: 'showData'
      }
    })
    .populate({
      path: 'lists',
      model: 'list',
      populate: {
        path: 'shows',
        model: 'show'
      }
    })
    .then(user => {
      let show = user.shows.find(s => s.showData.tmdbId === +req.body.tmdbId)
      let prevList = user.lists.find(list => show.list.toString() === list._id.toString())
      prevList.shows = prevList.shows.filter(s => s._id.toString() !== show._id.toString())
      let nextLilst = user.lists.find(list => list.name === req.body.list)
      nextLilst.shows.push(show)
      show.list = nextLilst

      return Promise.all([
        show.save(),
        prevList.save(),
        nextLilst.save()
      ])
    })
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put('/', verifyMiddleware, (req, res, next) => {
  // add/remove from favorites
  User.findOne({ email: req.user.email })
    .populate({
      path: 'shows',
      model: 'show',
      populate: { path: 'showData', model: 'showData' }
    })
    .then(user => {
      let show = user.shows.find(s => s.showData.tmdbId === +req.body.tmdbId) 
      Object.assign(show, req.body)
      return show.save()
    })
    .then(() => res.sendStatus(200))
    .catch(next)
})

module.exports = router
