const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GenreSchema = new Schema({
  name: String,
  showDatas: [{
    type: Schema.Types.ObjectId,
    ref: 'show'
  }]
}, { usePushEach: true })

const Genre = mongoose.model('genre', GenreSchema)

module.exports = Genre
