const httpHeader = (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, Cache-Control, Content-Security-Policy, Access-Control-Allow-Origin')
  res.header('Access-Control-Allow-Methods', 'POST,GET,TRACE,OPTIONS,PATCH,PUT,DELETE')
  res.header('X-Powered-By', '3.2.1')
  res.header('Cache-Control', 'Pragma: no-cache')
  res.header('Access-Control-Max-Age', '86400')
  res.header('X-Content-Type-Options', 'nosniff')
  res.header('X-XSS-Protection', '1; report=<reporting-uri></reporting-uri>')
  next()
}

module.exports = httpHeader
