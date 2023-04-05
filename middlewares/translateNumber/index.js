const lodash = require('lodash')

// 预处理，将get值里的字符数字转化成Number
const translateNumber = (req, _, next) => {
  const { query } = req
  for (const key in query) {
    if (
      typeof query?.[key] === 'string' &&
      !lodash.isNaN(Number(query?.[key]))
    ) {
      query[key] = Number(query[key])
    }
  }
  next()
}

module.exports = translateNumber
