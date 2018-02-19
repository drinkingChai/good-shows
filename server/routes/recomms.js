const router = require('express').Router()
const { parseSequelize } = require('./helpers/sequelize.helper')
const { verifyMiddleware } = require('./helpers/token.helper')
const { Recomms, ShowItem, Show, User } = require('../../db')

// get all recommendations
router.get('/', verifyMiddleware, (req, res, next) => {
  const userId = req.user.id

  Recomms.findAll({ where: { friendId: userId, status: 'pending' } })
  .then(recomms => {
    res.send(recomms)
  })
  .catch(next)
})

router.post('/', verifyMiddleware, (req, res, next) => {
  const userId = req.user.id
  let { tmdbId, friendIds } = req.body

  Promise.all(friendIds.map(friendId => ShowItem.findOne({
    where: { userId: friendId },
    include: {
      model: Show,
      where: { tmdbId }
    }
  })))
  .then(items => {
    // if items already exist

    let existing = parseSequelize(items).reduce((obj, i) => {
      if (i) {
        obj[i.userId] = true
      }
      return obj
    }, {})

    friendIds = friendIds.filter(friendId => !existing[friendId])

    return Promise.all(friendIds.map(friendId => Recomms.findOne({
      where: { tmdbId, friendId }
    })))
    .then(recomms => {
      // if friend already has the recommendation

      let existing = parseSequelize(recomms).reduce((obj, i) => {
        if (i) {
          obj[i.friendId] = true
        }
        return obj
      }, {})

      friendIds = friendIds.filter(friendId => !existing[friendId])

      return Promise.all(friendIds.map(friendId => Recomms.create({
        tmdbId, userId, friendId, status: 'pending'
      })))
    })
  })
  .then(() => res.sendStatus(200))
  .catch(next)
})

router.post('/x', verifyMiddleware, (req, res, next) => {
  // deprecated - single user
  // recommend a show
  const userId = req.user.id
  const { tmdbId, friendId } = req.body

  ShowItem.findOne({
    where: { userId: friendId },
    include: {
      model: Show,
      where: { tmdbId }
    }
  })
  .then(showItem => {
    // if already in friend's list 
    if (showItem) throw new Error('Show already in friend list')

    return Recomms.findOne({ where: { tmdbId, friendId } })
  })
  .then(recom => {
    // if friend already has the recommendation
    if (recom) throw new Error('Recommendation cannot be made twice') // NOTE: remove comment - throw error but don't show message on front-end

    return Recomms.create({ tmdbId, userId, friendId, status: 'pending' }) 
  })
  .then(() => res.sendStatus(200))
  .catch(next)
})

router.put('/:id/accept', verifyMiddleware, (req, res, next) => {
  const { id } = req.params
  const userId = req.user.id

  // doesn't add the show, only sets as seen
  Recomms.findOne({ where: { id, friendId: userId }})
  .then(recom => {
    if (!recom) throw new Error('Invalid recommendation')

    Object.assign(recom, { status: 'seen' })
    return recom.save()
  })
  .catch(next)
})

router.put('/:id/deny', verifyMiddleware, (req, res, next) => {
  const { id } = req.params
  const userId = req.user.id

  // deny so it cannot be recommended again
  Recomms.findOne({ where: { id, friendId: userId }}) 
  .then(recom => {
    if (!recom) throw new Error('Invalid recommendation')

    Object.assign(recom, { status: 'denied' })
    return recom.save()    
  })
  .catch(next)
})

module.exports = router