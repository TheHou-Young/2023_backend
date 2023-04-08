const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

// 签名的密钥
const jwt_secret = 'mySecretKey'
// token过期时间为1天，不然测试老是过期=_=!
const jwt_access_expiration = 60 * 60 * 24
const jwt_refresh_expiration = jwt_access_expiration * 10

const createJwt = ({ account, role_id }) => {
  const maxage = new Date().valueOf()
  const refresh_token_maxage = new Date(maxage + jwt_refresh_expiration)

  const refresh_token = createRefreshToken()
  const access_token = createAccessToken({ account, role_id })

  return [refresh_token, refresh_token_maxage, access_token]
}

const createAccessToken = (params) => {
  return jwt.sign(params, jwt_secret, {
    expiresIn: jwt_access_expiration,
  })
}

const createRefreshToken = () => {
  return uuidv4()
}

const verifyJwt = (token) => {
  const result = jwt.verify(token, jwt_secret, null, null)
  return result
}

module.exports = {
  createJwt,
  verifyJwt,
}
