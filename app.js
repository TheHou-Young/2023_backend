const express = require('express')
const expressConfig = require('./config/express')
const { loadRouter } = require('./routes/index')
const { loadEnv } = require('./config/env')
const connectDB = require('./config/db')
const { httpHeaderConfig, httpErrorConfig } = require('./config/http')
const loggerConfig = require('./config/logger')

const app = express()

loadEnv() // 加载env环境
connectDB() // 连接数据库
expressConfig(app) // express一些前置处理
httpHeaderConfig(app) // 前置处理
loggerConfig(app) // 日志打印
loadRouter(app) // 路由加载
httpErrorConfig(app) // 错误处理

module.exports = app
