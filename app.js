const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const { loadRouter } = require('./routes/index')
const { loadEnv } = require('./config/env')
const connectDB = require('./config/db')
const { httpConfig, httpErrorConfig } = require('./config/http')

const app = express()

// 加载env环境
loadEnv()
// 连接数据库
connectDB()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 前置处理
httpConfig(app)
// 路由加载
loadRouter(app)
// 错误处理
httpErrorConfig(app)

module.exports = app
