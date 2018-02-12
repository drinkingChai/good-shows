const conn = require('./conn'),
      bcrypt = require('bcrypt')
      Sequelize = conn.Sequelize

const userSchema = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Name is required!' }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Password is required!' }
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Email is required!' }
    }
  }
}

const userHooks = {
  beforeCreate(instance, options) {
    instance.name = instance.name.toLowerCase()

    return hashPassword(instance)
  },
  beforeUpdate(instance, options) {
    if (instance.name) instance.name = instance.name.toLowerCase()
      
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

const hashPassword = instance => {
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

User.prototype.changePassword = function(curpass, newpass) {
  return bcrypt.compare(curpass, this.password)
  .then((valid) => {
    if (!valid) throw new Error('Current password incorrect.')

    return this.update({ password: newpass })
  })
}

module.exports = User
