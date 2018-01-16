const mongoose = require('mongoose')
const Genre = require('./genre')
const Schema = mongoose.Schema

const ShowDataSchema = new Schema({
  title: String,
  plot: String,
  genres: [Genre],
  imdbID: String,
  posterPath: String
}, { usePushEach: true })

const ShowData = mongoose.model('showData', ShowDataSchema)

module.exports = ShowData
