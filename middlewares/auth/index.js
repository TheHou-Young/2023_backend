const { redisClient } = require('../../config/db/redis')
const { verifyJwt } = require('../../utils/jwt')

const auth = async (req, _, next) => {
  const token = req?.headers?.authorization
  const { account } = await verifyJwt(token)
  const object = await redisClient.get(account)
  console.log(object)
  next()
}

module.exports = auth
