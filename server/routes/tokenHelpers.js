const jwt = require('jsonwebtoken')

const createToken = (tokenData) => {
  return jwt.sign(tokenData, process.env.SECRET)
}

function verifyJwtPromise(key) {
  return new Promise(function(resolve, reject) {
    jwt.verify(key, process.env.SECRET, function(err, tokenData) {
      if (err) return reject(err)
      resolve(tokenData)
    })
  })
}

async function verifyToken(token) {
  const key = token.slice(token.indexOf(' ') + 1)

  let result = await verifyJwtPromise(key)

  return result
}

module.exports = {
  createToken,
  verifyToken
}
