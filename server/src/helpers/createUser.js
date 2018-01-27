const User = require('../user')
const List = require('../list')

const defaultLists = (user) => {
  return [
    new List({ name: 'To Watch', user }),
    new List({ name: 'Currently Watching', user }),
    new List({ name: 'Watched', user }),
    new List({ name: 'All Shows', user })
  ]
}

const createUser = (user) => {
  let lists = defaultLists(user)
  user.lists = lists
  
  return Promise.all([
    List.insertMany(lists),
    user.save()
  ])
  .then(() => {
    return user
  })
}

module.exports = {
  createUser
}
