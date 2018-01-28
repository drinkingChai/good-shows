const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Genre = require('./genre')

const ShowDataSchema = new Schema({
  name: String,
  overview: String,
  genres: [Genre],
  tmdbId: Number,
  posterPath: String,
  voteAverage: Number,
  firstAirDate: Date
}, { usePushEach: true })

const ShowData = mongoose.model('showData', ShowDataSchema)

module.exports = ShowData
