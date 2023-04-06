const userDao = require("../dao/user")
const createJwt = require("../utils/jwt")
const { redisClient } = require("../config/db/redis")
const _ = require("lodash")

class LoginService {
  async login({ account, password }) {
    const result = await userDao.findUserByAccount(account)
    switch (true) {
      case _.isEmpty(result):
        throw new Error("该账号不存在.")
      case result.password !== password:
        throw new Error("密码错误，请重试.")
      case result.activation_status === 0:
        throw new Error("该号码未被激活，请重试.")
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
