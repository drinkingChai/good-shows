const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShowSchema = new Schema({
  favorite: Boolean,
  list: {
    type: Schema.Types.ObjectId,
    ref: 'list'
  },
  tmdbId: {
    type: String 
  },
  showData: {
    type: Schema.Types.ObjectId,
    ref: 'showData'
  },
  watchOn: String,
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, { usePushEach: true, timestamps: true })

ShowSchema.virtual('likesCount').get(function() {
  return this.likes.length
})

const Show = mongoose.model('show', ShowSchema)

module.exports = Show
