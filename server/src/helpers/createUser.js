const User = require('../user')
const List = require('../list')

const defaultLists = (user) => {
  return [
    new List({ name: 'Watch List', user }),
    new List({ name: 'Watching', user }),
    new List({ name: 'Watched', user })
  ]
}

const createUser = (user) => {
  let lists = defaultLists(user)
  user.lists = lists
  user.defaultList = lists[0]
  
  return Promise.all([
    List.insertMany(lists),
    user.save()
  ])
  .then(() => User.findById(user._id))
}

module.exports = {
  createUser
}
