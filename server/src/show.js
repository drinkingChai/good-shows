const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validLists = require('./validLists')

const ShowSchema = new Schema({
  favorite: Boolean,
  list: {
    type: String,
    validate: {
      validator: function(str) {
        return new RegExp(validLists.map(l => `(${l})`).join('|'), 'g').test(str)
      },
      message: 'Invalid list.'
    },
    default: 'wantToWatch'
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
  }]
}, { usePushEach: true, timestamps: true })

ShowSchema.virtual('likesCount').get(function() {
  return this.likes.length
})

const Show = mongoose.model('show', ShowSchema)

module.exports = Show
