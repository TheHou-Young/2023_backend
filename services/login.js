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
    const [refresh_token, refresh_token_maxage, access_token] = createJwt(account)
    await redisClient.set(
      refresh_token,
      JSON.stringify({
        account: result.account,
        expires: refresh_token_maxage,
      })
    )
    return {
      user: result,
      access_token: access_token,
      refresh_token: refresh_token,
    }
  }
}

const loginService = new LoginService()
module.exports = loginService
