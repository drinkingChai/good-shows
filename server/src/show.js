const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShowSchema = new Schema({
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
  }]
})

ShowSchema.virtual('likesCount').get(function() {
  return this.likes.length
})

const Show = mongoose.model('show', ShowSchema)

module.exports = Show
