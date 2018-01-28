const router = require('express').Router()
const Show = require('../src/show')
const ShowData = require('../src/showData')
const User = require('../src/user')
const List = require('../src/list')
const request = require('request-promise')
const { verifyMiddleware } = require('./tokenHelpers')

let createOptions = (api_key, tmdbId) => ({
  method: 'GET',
  url: `https://api.themoviedb.org/3/tv/${tmdbId}`,
  qs: {
    language: 'en-US',
    api_key: api_key
  },
  body: '{}'
})

router.get('/:tmdbId', (req, res, next) => {
  console.log('hit')
  let options = createOptions(process.env.TMDB_API_KEY, req.params.tmdbId)

  request(options)
    .then((result) => {
      res.send(result)
    })
    .catch(next)
})

router.post('/', verifyMiddleware, (req, res, next) => {
  // add to a list
  // find in ShowData, if not
  // search TMDB api, add to ShowData
  Show.findOne({ user: req.user._id, tmdbId: req.body.tmdbId })
    .then(show => {
      if (show) throw new Error('Show cannot be added twice!')
    })
    .then(() => ShowData.findOne({ tmdbId: req.body.tmdbId }))
    .then(showData => {
      if (showData) return showData

      let options = createOptions(process.env.TMDB_API_KEY, req.body.tmdbId)

      return request(options)
        .then(result => {
          const {
            name, overview, genres,
            first_air_date, vote_average, poster_path, id
          } = JSON.parse(result)

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
        showData,
        tmdbId: showData.tmdbId,
        user: req.user
      })

      return newShow.save()
    })
    .then(show => {
      return Promise.all([
        List.findOne({ user: req.user._id, name: req.body.list }),
        List.findOne({ user: req.user._id, name: 'All Shows' })
      ])
      .then(([list, allShows]) => {
        show.list = list
        list.shows.push(show)
        allShows.shows.push(show)

        return Promise.all([
          allShows.save(),
          show.save(),
          list.save()
        ])
      })
    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(next)
})

router.delete('/:tmdbId', verifyMiddleware, (req, res, next) => {
  // remove from lists
  User.findOne({ email: req.user.email })
    .populate({
      path: 'shows',
      model: 'show',
      populate: {
        path: 'showData',
        model: 'showData'
      }
    })
    .then(user => {
      let show = user.shows.find(show => show.showData.tmdbId === +req.params.tmdbId)
      user.shows = user.shows.filter(show => show.showData.tmdbId !== +req.params.tmdbId)

      return Promise.all([
        show.remove(),
        user.save()   
      ])
    })
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.put('/changelist', verifyMiddleware, (req, res, next) => {
  // change list
  // body: { tmdbId: <String>, fromList: <String>, toList: <String> }
  let show
  Show.findOne({
    user: req.user._id,
    tmdbId: +req.body.tmdbId
  })
  .populate('list')
  .then((_show) => {
    show = _show
  })
  .then(() => Promise.all([
    List.findOne({ user: req.user._id, name: req.body.fromList }),
    List.findOne({ user: req.user._id, name: req.body.toList })
  ]))
  .then(([fromList, toList]) => {
    show.list = toList
    fromList.shows = fromList.shows.filter(s => s._id !== show._id)
    toList.shows.push(show)

    return Promise.all([
      show.save(),
      fromList.save(),
      toList.save()
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
