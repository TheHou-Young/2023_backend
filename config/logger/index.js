const fs = require('fs')
const path = require('path')
const logger = require('morgan')
const lodash = require('lodash')

const loggerConfig = (app) => {
  // 配置日志的本地文件路径
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../../log/access.log'),
    { flags: 'a' }
  )
  // 往日志添加用户信息
  logger.token('id', (req) => req.headers.userId)
  // 往日志添加时间
  logger.token('localDate', () => new Date().toLocaleString())
  // 日志中间件的设置使用
  app.use(
    logger(
      ':id :remote-addr - :remote-user [:localDate] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
      {
        skip: (req) => lodash.isNil(req?.headers?.userId), // 空值就跳过
        stream: accessLogStream,
      }
    )
  )
}

module.exports = loggerConfig
