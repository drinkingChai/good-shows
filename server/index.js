const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      db = require('../db'),
      app = express(),
      port = process.env.PORT || 3001

require('dotenv').config()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', require('./routes'))

app.use((err, req, res, next) => {
  console.log('\n***************** server error *****************\n')
  console.log(err.message)
  console.log('\n*************** end server error ***************\n')
  res.status(err.status || 500).send(err.message)
})

db.sync()
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}`))
  })
  .catch((err) => {
    console.warn('Error', err)
  })

module.exports = app
