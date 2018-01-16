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
}, { usePushEach: true })

ListSchema.methods.addToList = function(show, listName = 'wantToWatch') {
  // adds a show<Show> to a list with name listName<String>
  // on search => <showData> objects will be added to the database...
  // first check showData to see if it exists, search by imdbID
  // create a show<Show> with showData
}

const List = mongoose.model('list', ListSchema)

module.exports = List
