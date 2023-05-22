const wordFilter = require('sensitive-word-filter')

// 这个函数不是纯函数
const sensitiveObjectFilter = (object, blackList = []) => {
  for (let index in object) {
    if (blackList.includes(index)) continue
    if (typeof object[index] === 'string') {
      object[index] = wordFilter.filter(object[index])
    }
  }
}

const blackList = ['password', 'account', 'role_id', '_id', 'permission_pid', 'my_account', 'my_role_id']
// 政治敏感词过滤器
const sensitiveFilter = (req, _, next) => {
  // 一般在body里面才会做操作
  sensitiveObjectFilter(req.body, blackList)
  next()
}

module.exports = sensitiveFilter
