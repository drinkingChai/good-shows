const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShowSchema = new Schema({
  favorite: Boolean,
  list: {
    type: Schema.Types.ObjectId,
    ref: 'list'
  },
  tmdbId: {
    type: Number 
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
  },
  isPrivate: {
    type: Boolean,
    default: false
  }
}, { usePushEach: true, timestamps: true })

const Show = mongoose.model('show', ShowSchema)

module.exports = Show
