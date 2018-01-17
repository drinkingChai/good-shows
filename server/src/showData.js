const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShowDataSchema = new Schema({
  title: String,
  plot: String,
  genres: [{
    type: Schema.Types.ObjectId,
    ref: 'genre'
  }],
  imdbID: String,
  posterPath: String
}, { usePushEach: true })

const ShowData = mongoose.model('showData', ShowDataSchema)

module.exports = ShowData
