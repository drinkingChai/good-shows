const assert = require('assert')
const Show = require('../server/src/show')
const ShowData = require('../server/src/showData')
const User = require('../server/src/user')
const Comment = require('../server/src/comment')

describe('Add Comment test', () => {
  let got, comment, peter, emilia

  beforeEach(done => {
    peter = new User({
      name: 'Peter Dinklage',
      email: 'peter@hand.com',
      password: 'dornishred'
    })

    emilia = new User({
      name: 'Emilia Clarke',
      email: 'emilia@queen.co',
      password: 'drakaris'
    })

    got = new ShowData({
      title: 'Game of Thrones',
      plot: 'Westeros',
      imdbID: 't1231423',
      posterPath: 'http://got.com'
    })

    comment = new Comment({
      content: 'I like the dragon queen in this show!',
      user: emilia
    })

    show = new Show({
      showData: got,
      likes: [emilia],
      comments: [comment]
    })

    peter.shows.push(show)

    Promise.all([
      got.save(),
      comment.save(),
      show.save(),
      peter.save(),
      emilia.save()
    ])
    .then(() => done())
    .catch(done)
  })

  it('expect to have 1 like', () => {
    assert(show.likesCount === 1)
  })

  it('saves comment to show', done => {
    User.findOne({ name: 'Peter Dinklage' })
      .populate({
        path: 'shows',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then(user => {
        assert(user.name === 'Peter Dinklage')
        assert(user.shows[0].comments.length === 1)
        assert(user.shows[0].likesCount === 1)
        assert(user.shows[0].comments[0].content === 'I like the dragon queen in this show!')
        assert(user.shows[0].comments[0].user.name === 'Emilia Clarke')
        done()
      })
      .catch(done)
  })
})
