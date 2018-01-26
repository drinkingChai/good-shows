const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  email: {
    type: String,
    validate: {
      validator: email => email.length > 5, // replace with email validator
      message: 'Must be valid e-mail.'
    },
    required: [true, 'Email is required.']
  },
  password: {
    type: String,
    validate: {
      validator: password => password, // replace with password validator
      message: 'Password cannot be empty.'
    },
    required: [true, 'Password is required.']    
  },
  shows: [{
    type: Schema.Types.ObjectId,
    ref: 'show',
    default: []
  }],
  lists: [{
    type: Schema.Types.ObjectId,
    ref: 'list'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  pendingFriends: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
}, { usePushEach: true })

UserSchema.pre('save', function(next) {
  if (this.isNew) {
    bcrypt.hash(this.password, +process.env.SALT)
      .then(hash => {
        this.password = hash
        next()
      })
      .catch(next)
  }
  else next()
})

UserSchema.virtual('tokenData').get(function() {
  return {
    name: this.name,
    email: this.email,
    shows: this.shows,
    friends: this.friends,
    _id: this._id
  }
})

UserSchema.statics.verifyLogin = function(email, password) {
  return this.findOne({ email })
    .populate({
      path: 'shows',
      model: 'show',
      populate: {
        path: 'list',
        model: 'list'
      }
    })
    .then(user => {
      if (!user) return null

      return bcrypt.compare(password, user.password)
        .then(result => {
          if (!result) throw new Error('Incorrect email or password.')

          return user.tokenData
        })
    })
}

// UserSchema.virtual('postCount').get(function() {
//   // not =>, needs scope
//   return this.posts.length
// })

// // before remove event
// // also: save event, update?
// UserSchema.pre('remove', function(next) {
//   // don't require model inside another model function
//   // cyclic load
//   // use mongoose.model instead
//   const BlogPost = mongoose.model('blogPost')

//   // don't do this.blogPosts.forEach remove
//   BlogPost.remove({ _id: { $in: this.blogPosts }}) // find BlogPosts $in this.blogPosts
//     .then(() => next())
// })

const User = mongoose.model('user', UserSchema)

module.exports = User
