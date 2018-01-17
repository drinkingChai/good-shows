const assert = require('assert')
const Genre = require('../server/src/genre')
const ShowData = require('../server/src/showData')

describe('Genre test', () => {
  let drama, got, nof

  beforeEach(done => {
    got = new ShowData({
      name: 'Game of Thrones'
    })

    nof = new ShowData({
      name: 'The Night Of'
    })

    drama = new Genre({
      name: 'drama'
    })

    Promise.all([
      got.save(),
      nof.save(),
      drama.save()
    ])
    .then(() => done())
    .catch(done)
  })

  it('can add a genre to a show', done => {
    got.genres.push(drama)

    got.save()
      .then(() => {
        return ShowData.findOne({ name: 'Game of Thrones' })
          .populate('genres')
      })
      .then(showData => {
        assert(showData.genres.length === 1)
        assert(showData.genres[0].name === 'drama')
        done()
      })
      .catch(done)
  })

  it('returns all shows with genre', done => {
    drama.showDatas.push(nof)
    drama.showDatas.push(got)

    drama.save()
      .then(() => {
        return Genre.findOne({ name: 'drama' })
          .populate({
            path: 'showDatas',
            model: 'showData'
          })
      })
      .then(genre => {
        assert(genre.showDatas.length === 2)
        assert(genre.showDatas[0].name === 'Game of Thrones' || genre.showDatas[0].name === 'The Night Of')
        assert(genre.showDatas[0].name !== genre.showDatas[1].name)
        done()
      })
      .catch(done)
  })
})
