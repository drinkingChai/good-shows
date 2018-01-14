const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    }
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
      validator: password => password,
      message: 'Password cannot be empty.'
    },
    required: [true, 'Password is required.']    
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'list'
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
}, { usePushEach: true })

// UserSchema.virtual('postCount').get(function() {
//   // not =>, needs scope
//   return this.posts.length
// })

// // before remove event
// // also: save event
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
