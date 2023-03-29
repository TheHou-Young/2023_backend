const lodash = require('lodash')

const httpHeaderConfig = (expressInstance) => {
  // 为所有响应添加跨域设置
  expressInstance?.use('*', (_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
    )
    res.header('Access-Control-Allow-Methods', 'POST,GET,TRACE,OPTIONS')
    res.header('X-Powered-By', '3.2.1')
    next()
  })

  // 前端的预检请求（preflight request），为了获知服务端是否允许该请求
  expressInstance?.options('*', (_, res) => {
    res.sendStatus(200)
  })
}

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

const httpErrorConfig = (expressInstance) => {
  // catch 404 and forward to error handler
  expressInstance.use((_, __, next) => {
    next(createError(404))
  })

  // error handler
  expressInstance.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })
}

module.exports = { httpHeaderConfig, httpErrorConfig }
