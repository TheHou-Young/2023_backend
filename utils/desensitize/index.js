const lodash = require('lodash')
/**
 * 脱敏函数，用于脱敏统一处理
 * 这里只处理密码脱敏，如果有账号脱敏需求可以在这里处理
 * TODO: 这里应该要有一个脱敏名单，做的更加优雅一点，以及是遮盖处理还是删除处理的判断
 */
const desensitizeList = ['password']
const desensitize = (result) => {
  // 列表脱敏
  if (!lodash.isNil(result?.list) && lodash.isArray(result?.list)) {
    result.list = result.list.map((ele) => lodash.omit(ele, desensitizeList))
    return result
  }
  // 如果是单个对象，对对象内容进行脱敏
  if (lodash.isObject(result) && !lodash.isNil(result.password)) {
    const jsonResult = result.toJSON()
    return lodash.omit(jsonResult, desensitizeList)
  }
  return result
}

module.exports = desensitize
