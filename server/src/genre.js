const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GenreSchema = new Schema({
  id: Number,
  name: String
})

module.exports = GenreSchema
