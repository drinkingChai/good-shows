const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShowDataSchema = new Schema({
  name: String,
  overview: String,
  genres: [{
    type: Schema.Types.ObjectId,
    ref: 'genre'
  }],
  tmdbID: String,
  posterPath: String,
  voteAverage: Number,
  firstAirDate: Date
}, { usePushEach: true })

const ShowData = mongoose.model('showData', ShowDataSchema)

module.exports = ShowData
