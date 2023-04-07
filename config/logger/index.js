const fs = require('fs')
const path = require('path')
const logger = require('morgan')
const lodash = require('lodash')

const defaultPath = path.join(__dirname, '../../log')
const defaultPathWithFile = `${defaultPath}/access.log`
fs.mkdirSync(defaultPath, { recursive: true }) // 创建文件夹
fs.appendFileSync(defaultPath, '', { recursive: true }) // 创建文件
console.log('log文件创建成功')

const loggerConfig = (app) => {
  // 配置日志的本地文件路径
  const accessLogStream = fs.createWriteStream(defaultPathWithFile, {
    flags: 'a',
  })
  // 往日志添加用户信息
  logger.token('id', (req) => req.headers.authorization)
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
