const conn = require('./conn'),
      bcrypt = require('bcrypt')
      Sequelize = conn.Sequelize

const userSchema = {
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  }
}

const userHooks = {
  beforeCreate(instance, options) {
    return hashPassword(instance)
  },
  beforeUpdate(instance, options) {
    return instance.changed('password') ?
      hashPassword(instance) :
      instance
  }
}

const getterMethods = {
  tokenData() {
    return {
      name: this.name,
      email: this.email,
      id: this.id
    }
  }
}

const hashPassword = (instance, password) => {
  return bcrypt.hash(instance.password, +process.env.SALT)
    .then((hashed) => {
      instance.password = hashed
      return instance
    })
}

const User = conn.define('user', userSchema, { hooks: userHooks, getterMethods: getterMethods })

User.verifyLogin = function(email, password) {
  return this.findOne({ where: { email }})
    .then(user => {
      if (!user) throw new Error('User not found.')

      return bcrypt.compare(password, user.password)
        .then((valid) => {
          if (!valid) throw new Error('Invalid password.')
          return user.tokenData
        })
    })
}

module.exports = User
