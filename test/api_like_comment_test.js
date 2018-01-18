// add, remove comment
// like, unlike
const assert = require('assert')
const server = require('../server')
const chai = require('chai')
const qs = require('qs')
const Show = require('../server/src/show')
const Comment = require('../server/src/comment')
const User = require('../server/src/user')
chai.use(require('chai-http'))

xdescribe('API new like/comment test', () => {
  let peter, emilia, show

  beforeEach((done) => {
    peter = new User({
      name: 'Peter',
      email: 'peter@dragon.com',
      password: 'peter'
    })

    emilia = new User({
      name: 'Emilia',
      email: 'emilia@dragon.com',
      password: 'dragon'
    })

    show = new Show({})
    peter.shows.push(show)
    peter.friends.push(emilia)
    emilia.friends.push(peter)

    Promise.all([
      show.save(),
      peter.save(),
      emilia.save()
    ])
    .then(() => done())
    .catch(done)
  })

  it('/POST a new comment', (done) => {
    chai.request(server)
      .post('/api/auth/local')
      .send({ email: 'emilia@dragon.com', password: 'dragon' })
      .end((err, res) => {
        if (err) return done(err)

        let token = Object.entries(qs.parse(res.redirects[0]))[0][1]

        chai.request(server)        
          .post('/api/comment')
          .set('Authorization', `Bearer ${token}`)
          .send({ onUser: peter._id.toString(), showId: show._id.toString(), content: 'I like the dragon queen ;)' })
          .end((err, res) => {
            if (err) return done(err)

            Show.findById(show._id)
              .populate('comments')
              .then(show => {
                assert(show.comments.length === 1)
                assert(show.comments[0].user.toString() === emilia._id.toString())
                assert(show.comments[0].content === 'I like the dragon queen ;)')
                done()
              })
              .catch(done)
          })
      })
  })

  it('/POST a new like', (done) => {
    chai.request(server)
      .post('/api/auth/local')
      .send({ email: 'emilia@dragon.com', password: 'dragon' })
      .end((err, res) => {
        if (err) return done(err)

        let token = Object.entries(qs.parse(res.redirects[0]))[0][1]

        chai.request(server)        
          .post('/api/like')
          .set('Authorization', `Bearer ${token}`)
          .send({ onUser: peter._id.toString(), showId: show._id.toString() })
          .end((err, res) => {
            if (err) return done(err)

            Show.findById(show._id)
              .populate('likes')
              .then(show => {
                assert(show.likes.length === 1)
                assert(show.likes[0]._id.toString() === emilia._id.toString())
                done()
              })
              .catch(done)
          })
      })
  })
})

xdescribe('API remove like/comment test', () => {
  let peter, emilia, show, comment

  beforeEach((done) => {
    peter = new User({
      name: 'Peter',
      email: 'peter@dragon.com',
      password: 'peter'
    })

    emilia = new User({
      name: 'Emilia',
      email: 'emilia@dragon.com',
      password: 'dragon'
    })

    show = new Show({})
    comment = new Comment({ user: emilia, content: 'I like the dragon queen ;)' })
    show.comments.push(comment)
    show.likes.push(emilia)
    peter.shows.push(show)
    peter.friends.push(emilia)
    emilia.friends.push(peter)

    Promise.all([
      show.save(),
      comment.save(),
      peter.save(),
      emilia.save()
    ])
    .then(() => done())
    .catch(done)
  })

  it('/DELETE remove a comment', (done) => {
    chai.request(server)
      .post('/api/auth/local')
      .send({ email: 'emilia@dragon.com', password: 'dragon' })
      .end((err, res) => {
        if (err) return done(err)

        let token = Object.entries(qs.parse(res.redirects[0]))[0][1]

        chai.request(server)        
          .delete('/api/comment')
          .set('Authorization', `Bearer ${token}`)
          .send({ showId: show._id, commentId: comment._id })
          .end((err, res) => {
            if (err) return done(err)

            Show.findById(show._id)
              .then(show => {
                assert(show.comments.length === 0)
                done()
              })
              .catch(done)
          })
      })
  })

  it('/DELETE remove a like', (done) => {
    chai.request(server)
      .post('/api/auth/local')
      .send({ email: 'emilia@dragon.com', password: 'dragon' })
      .end((err, res) => {
        if (err) return done(err)

        let token = Object.entries(qs.parse(res.redirects[0]))[0][1]

        chai.request(server)        
          .delete('/api/like')
          .set('Authorization', `Bearer ${token}`)
          .send({ showId: show._id })
          .end((err, res) => {
            if (err) return done(err)

            Show.findById(show._id)
              .then(show => {
                assert(show.likes.length === 0)
                done()
              })
              .catch(done)
          })
      })
  })
})

