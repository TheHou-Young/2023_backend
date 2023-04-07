const userDao = require('../dao/user')
const { createJwt } = require('../utils/jwt')
const { redisClient } = require('../config/db/redis')
const _ = require('lodash')

class LoginService {
  async login({ account, password }) {
    const result = await userDao.findUserByAccountWithoutFilter({
      account,
      password, // TODO: 需要加多一个角色来判断是哪个账户
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
      result.account, // 有潜在bug，因为有一个account但是有多个账号的情况
      JSON.stringify({
        expires: refresh_token_maxage,
        token: token, // TODO: set的key值我理解用token的加盐值，value为result会不会更好一些？
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
