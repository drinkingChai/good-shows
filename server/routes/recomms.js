const router = require('express').Router()
const { verifyMiddleware } = require('./helpers/token.helper')
const { Recomms, ShowItem, Show } = require('../../db')

// get all recommendations
router.get('/', verifyMiddleware, (req, res, next) => {
  const userId = req.user.id

  Recomms.findOne({ where: { friendId: userId, status: 'pending' } })
  .then(recomms => {
    res.send(recomms)
  })
  .catch(next)
})

router.post('/', verifyMiddleware, (req, res, next) => {
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