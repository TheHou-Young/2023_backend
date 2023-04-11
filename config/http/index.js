const lodash = require('lodash')

// token相关配置
const httpTokenConfig = (expressInstance) => {
  // 检查用户的 token 是否合法
  expressInstance.use('*', (req, _, next) => {
    // 获取 token
    const token = req.cookies?.['auth-token']
    // 如果没有 token ，用户未登录， next()
    if (lodash.isNil(token)) {
    } else {
    }
    next()
  })
}

module.exports = { httpTokenConfig }
