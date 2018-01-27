const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      app = express(),
      port = process.env.PORT || 3001

require('dotenv').config()
mongoose.Promise = Promise,
mongoose.connect(process.env.DATABASE_URI, { useMongoClient: true })

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', require('./routes'))

app.use((err, req, res, next) => {
  console.log('\n***************** server error *****************\n')
  console.log(err.message)
  // console.log(err)
  console.log('\n*************** end server error ***************\n')
  res.status(err.status || 500).send(err.message)
})

mongoose.connection
  .once('open', () => {
    app.listen(port, () => console.log(`listening on port ${port}`))
  })
  .on('error', error => {
    console.warn('Error', error)
  })

module.exports = app
