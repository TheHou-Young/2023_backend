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
    throw new Fail({
      msg: error.message,
    })
  }
}

module.exports = wrapper
