const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const { loadRouter } = require('./routes/index')
const { connectMongoose } = require('./config/db/mongodb')
const { connectRedis } = require('./config/db/redis')
const dotenv = require('dotenv')

const app = express()

/**
 * 配置不同环境
 * env负责书写默认环境，其他的不同的环境如果有冲突会将env公共配置覆盖
 */
dotenv.config()
dotenv.config({
  path: path.resolve(
    __dirname,
    `./config/environments/.env.${process.env.NODE_ENV}`
  ),
})

// mongodb连接
connectMongoose()
// redis连接
connectRedis()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

loadRouter(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
