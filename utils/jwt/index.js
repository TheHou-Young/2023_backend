const jwt = require('jsonwebtoken')

//签名的密钥
const jwt_secret = 'mySecretKey'
//token过期时间为10分钟
const jwt_expiration = 60 * 10
const jwt_refresh_expiration = 60 * 10 * 1000

const createJwt = (account) => {
  const maxage = new Date().valueOf()
  const refresh_token_maxage = new Date(maxage + jwt_refresh_expiration)

  const token = jwt.sign(
    {
      account: account,
    },
    jwt_secret,
    {
      expiresIn: jwt_expiration,
    }
  )
  return [refresh_token_maxage, token]
}

const verifyJwt = (token) => {
  const result = jwt.verify(token, jwt_secret, null, null)
  return result
}

module.exports = {
  createJwt,
  verifyJwt,
}
