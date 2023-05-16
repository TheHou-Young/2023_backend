const { OK, Fail } = require('../result')
const cryptoInstance = require('../crypto')

const wrapper = (handler) => async (req, res, next) => {
  try {
    const response = await handler?.(req, res, next)
    const result = new OK({
      data: response,
      msg: '操作成功',
    })
    const encryptData = cryptoInstance.encryptByAES(JSON.stringify(result), res.AESKey)
    res.send(encryptData)
  } catch (error) {
    const errorResult = new Fail({
      msg: error.message,
    })
    res.send(errorResult)
  }
}

module.exports = wrapper
