const fs = require('fs')
const path = require('path')
const logger = require('morgan')
const lodash = require('lodash')
const { verifyJwt } = require('../../utils/jwt')

const defaultPath = path.join(__dirname, '../../log')
const defaultPathWithFile = `${defaultPath}/access.log`
fs.mkdirSync(defaultPath, { recursive: true }) // 创建文件夹
fs.appendFileSync(defaultPath, '', { recursive: true }) // 创建文件
console.log('log文件创建成功')

// 配置日志的本地文件路径
const accessLogStream = fs.createWriteStream(defaultPathWithFile, {
  flags: 'a',
})
// 往日志添加用户信息
logger.token('account', (req) => {
  try {
    return verifyJwt(req.headers.authorization)?.account ?? '-'
  } catch (error) {
    return '-'
  }
})
// 往日志添加时间
logger.token('localDate', () => new Date().toLocaleString())
logger.token('params', (req) => JSON.stringify(!lodash.isEmpty(req.body) ? req.body : !lodash.isEmpty(req.params) ? req.params : {}))

// 日志中间件的设置使用
const loggerMiddleware = logger(':account :remote-addr - :remote-user [:localDate] ":method :url HTTP/:http-version" :status :res[content-length] :params ":user-agent"', {
  skip: (req) => lodash.isNil(req?.headers?.authorization), // 空值就跳过
  stream: accessLogStream,
})

module.exports = loggerMiddleware
