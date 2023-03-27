const httpConfig = (expressInstance) => {
  // 为所有响应添加跨域设置
  expressInstance?.use('*', (_, res, next) => {
    // TODO（钟卓江）: 我认为为了安全性考虑应该限制允许跨域的来源
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

module.exports = { httpConfig, httpErrorConfig }
