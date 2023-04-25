const lodash = require('lodash')
/**
 * 脱敏函数，用于脱敏统一处理
 * 这里只处理密码脱敏，如果有账号脱敏需求可以在这里处理
 * TODO: 这里应该要有一个名单，做的更加优雅一点
 */
const desensitize = (result) => {
  // 列表脱敏
  if (!lodash.isNil(result?.list) && lodash.isArray(result?.list)) {
    result.list = result.list.map((ele) => {
      delete ele['password']
      return ele
    })
    return result
  }
  // 如果是单个对象，对对象内容进行脱敏
  if (lodash.isObject(result) && !lodash.isNil(result.password)) {
    delete result['password']
    return result
  }
  return result
}

module.exports = desensitize
