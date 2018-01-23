const User = require('../user')
const List = require('../list')

const defaultLists = () => {
  return [
    new List({ name: 'Watch List' }),
    new List({ name: 'Watching' }),
    new List({ name: 'Watched' })
  ]
}

const createUser = (user) => {
  let lists = defaultLists()
  user.lists = lists
  user.defaultList = lists[0]
  
  return Promise.all([
    List.insertMany(lists),
    user.save()
  ])
}

module.exports = {
  createUser
}
