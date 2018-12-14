const jwt = require('jsonwebtoken')
const authSecret = require('../Auth/config').secret

// Verify Token
module.exports = (req, res, next) => {
  console.log('------------------------------------')
  console.log('endpoint', req.originalUrl)
  console.log('------------------------------------')
  // Get auth header value
  const bearerHeader = req.headers['authorization']
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ')
    // Get token from array
    const bearerToken = bearer[1]
    // Set the token
    req.token = bearerToken
    // Next middleware
    jwt.verify(bearerToken, authSecret, (err, authData) => {
      if (err) {
        console.log('------------------------------------')
        console.log('token expired')
        console.log('------------------------------------')
        res.json({
          status: 401,
          URL: req.get('host'),
          body: req.body,
          message: 'request token not verifiable'
        })
      } else {
        req.headers.user_data = authData;
        next()
      }
    })
  } else {
    // Forbidden
    res.json({
      status: 401,
      URL: req.get('host'),
      endpoint: req.originalUrl,
      body: req.body,
      message: 'request token not available'
    })
  }
}
