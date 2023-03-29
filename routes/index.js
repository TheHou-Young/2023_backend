const fs = require('fs')
require('express-async-errors') // 全局router异常处理的引入

// 后续创建route也无需在index目录中手动添加
// 流程：扫描 -> 过滤 -> 取文件 -> 加载
const autoLoadRoute = (blacklist = ['index.js'], whitelist = []) => {
  const fileList = fs.readdirSync('routes')
  return fileList
    .filter(
      (fileName) =>
        whitelist.includes(fileName) || !blacklist.includes(fileName)
    )
    .map((fileName) => fileName.split('.').shift())
    .reduce(
      (res, item) => ({
        ...res,
        [item]: require(`./${item}`),
      }),
      {}
    )
}

const routeStores = autoLoadRoute()

const loadRouter = (
  expressInstance,
  routes = routeStores,
  publicPath = '/api'
) =>
  Object.values(routes).forEach((router) =>
    expressInstance?.use(publicPath, router)
  )

module.exports = {
  loadRouter,
  routeStores,
}
