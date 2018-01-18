const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      app = express(),
      port = process.env.PORT || 3001
      
require('dotenv').config()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', require('./routes'))

app.get('/*', (req, res, next) => {
  res.sendStatus(200)
})

app.use((err, req, res, next) => {
  console.log('***************** server error *****************\n')
  console.log(err.message)
  console.log('\n*************** end server error ***************')
  res.status(err.status || 500).send(err.message)
})

app.listen(port, () => console.log(`listening on port ${port}`))

module.exports = app
