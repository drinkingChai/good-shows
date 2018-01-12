const express = require('express'),
      morgan = require('morgan'),
      app = express(),
      port = process.env.PORT || 3001

app.use(morgan('dev'))

app.listen(port, () => console.log(`listening on port ${port}`))
