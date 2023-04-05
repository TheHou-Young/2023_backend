const { OK, Fail } = require('../result')

const wrapper = (handler) => async (req, res, next) => {
  try {
    const response = await handler?.(req, res, next)
    const result = new OK({
      data: response,
      msg: '操作成功',
    })
    res.send(result)
  } catch (error) {
    const errorResult = new Fail({
      msg: error.message,
    })
    res.send(errorResult)
  }
}

module.exports = wrapper
