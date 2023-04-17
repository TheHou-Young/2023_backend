const userDao = require('../dao/user')
const { createJwt, createAccessToken } = require('../utils/jwt')
const { redisClient } = require('../config/db/redis')
const _ = require('lodash')

class LoginService {
  async login({ account, password, role_id }) {
    const result = await userDao.findUserWithRoleId({
      account,
      password,
      role_id,
    })
    switch (true) {
      case _.isEmpty(result):
        throw new Error('请检查账号、密码或登录角色是否出错.')
      case result.activation_status === 0:
        throw new Error('该号码未被激活，请重试.')
      default:
        break
    }
    const [refresh_token, refresh_token_maxage, access_token] = createJwt({
      account,
      role_id,
    })
    await redisClient.set(
      refresh_token,
      JSON.stringify({
        account: account,
        role_id: role_id,
        expires: refresh_token_maxage,
      })
    )
    return {
      user: result,
      access_token,
      refresh_token,
    }
  }

  async updateAccessToken({ refresh_token }) {
    const data = await redisClient.get(refresh_token)
    if (_.isEmpty(data)) throw new Error('该账号未登录，请登录')
    const { account, role_id, expires: refresh_token_maxage } = JSON.parse(data)
    const nowTime = new Date()
    const expireTime = new Date(refresh_token_maxage)
    if (nowTime > expireTime) {
      throw new Error('登录已经过期，请重新登录')
    } else {
      const new_access_token = createAccessToken({ account, role_id })
      return { access_token: new_access_token }
    }
  }

  async logout({ refresh_token }) {
    return await redisClient.del(refresh_token)
  }
}

const loginService = new LoginService()
module.exports = loginService
