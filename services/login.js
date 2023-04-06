const userDao = require('../dao/user')
const { createJwt } = require('../utils/jwt')
const { redisClient } = require('../config/db/redis')
const _ = require('lodash')

class LoginService {
  async login({ account, password }) {
    const result = await userDao.findUserByAccountWithoutFilter({
      account,
      password,
    })
    switch (true) {
      case _.isEmpty(result):
        throw new Error('请检查账号或密码是否出错.')
      case result.activation_status === 0:
        throw new Error('该号码未被激活，请重试.')
      default:
        break
    }
    const [refresh_token_maxage, token] = createJwt(account)
    await redisClient.set(
      result.account,
      JSON.stringify({
        expires: refresh_token_maxage,
        token: token,
      })
    )
    return {
      user: result,
      token: token,
    }
  }
}

const loginService = new LoginService()
module.exports = loginService
