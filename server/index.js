const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      app = express(),
      port = process.env.PORT || 3001

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', require('./routes'))

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message)
})

app.listen(port, () => console.log(`listening on port ${port}`))

module.exports = app
