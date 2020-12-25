const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
  let header, token

  if (
    !(header = req.header('Authorization')) ||
    !(token = header.replace('Bearer ', ''))
  ) {
    return res.status(401).send({
      status: 'Respond Fail',
      error: {
        message: `Access Denied!`,
      },
    })
  }

  try {
    const PrivateKey = TR4NSF0RMER
    const verified = jwt.verify(token, PrivateKey)

    req.channelId = verified
    next()
  } catch (err) {
    return res.status(401).send({
      status: 'Respond Fail',
      error: {
        message: `Invalid Token!`,
      },
    })
  }
}
