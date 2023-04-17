const lodash = require('lodash')
const DEFAULT = {
  page: 1,
  size: 10,
}

const formStringToNumber = (object, key) => {
  if (typeof object[key] === 'string' && !lodash.isNaN(Number(object[key]))) {
    object[key] = Number(object[key])
  }
}

const blackList = ['account', 'my_account'] // key值黑名单
// 预处理，将get值里的字符数字转化成Number
const translateNumber = (req, _, next) => {
  const { query } = req
  for (const key in query) {
    if (blackList.includes(key)) continue // account可以转化成数字，但是我们期望不要转化成数字
    formStringToNumber(query, key)
    // 数组传值整理
    if (query?.[key] instanceof Array) {
      for (const objKey in query[key]) {
        formStringToNumber(query[key], objKey)
      }
    }
  }
  // 设置默认页码
  query.page = !lodash.isNil(query.page) ? Number(query.page) : DEFAULT.page
  query.size = !lodash.isNil(query.size) ? Number(query.size) : DEFAULT.size
  next()
}

module.exports = translateNumber
