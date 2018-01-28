const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema({
  name: String,
  shows: [{
    type: Schema.Types.ObjectId,
    ref: 'show'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, { usePushEach: true })

const List = mongoose.model('list', ListSchema)

module.exports = List
