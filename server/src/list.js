const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema({
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'show'
  }],
  wantToWatch: [{
    type: Schema.Types.ObjectId,
    ref: 'show'
  }],
  watched: [{
    type: Schema.Types.ObjectId,
    ref: 'show'
  }],
  watching: [{
    type: Schema.Types.ObjectId,
    ref: 'show'
  }]
})

const List = mongoose.model('list', ListSchema)

module.exports = List
