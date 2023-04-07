const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

//签名的密钥
const jwt_secret = 'mySecretKey'
//access_token过期时间为2小时
const jwt_access_expiration = 60 * 60 * 2
//refresh_token的过期时间为7天
const jwt_refresh_expiration = 60 * 60 * 24 * 7

const createJwt = (account) => {
  const maxage = new Date().valueOf()
  const refresh_token_maxage = new Date(maxage + jwt_refresh_expiration)

  const refresh_token = createRefreshToken()
  const access_token = createAccessToken(account)

  return [refresh_token, refresh_token_maxage, access_token]
}

const createAccessToken = (account) => {
  return jwt.sign(
    {
      account: account,
    },
    jwt_secret,
    {
      expiresIn: jwt_access_expiration,
    }
  )
}

const createRefreshToken = () => {
  return uuidv4()
}

const verifyJwt = async (token) => {
  const result = await jwt.verify(token, jwt_secret, null, null)
  return result
}

module.exports = {
  createJwt,
  verifyJwt,
}
