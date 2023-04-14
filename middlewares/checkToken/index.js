const { Fail } = require('../../utils/result')
const { verifyJwt } = require('../../utils/jwt')

const assign = (object, account, role_id) => ({ ...object, my_account: account, my_role_id: role_id })

// 检查token是否合法，如果合法，则提取token携带的信息合并进请求参数
const checkToken = (req, res, next) => {
  const token = req?.headers?.authorization
  if (!token) next() // 没有token，可能是不需要鉴权的接口进行请求
  try {
    const { account, role_id } = verifyJwt(token)
    req.body = assign(req.body, account, role_id)
    req.query = assign(req.query, account, role_id)
    next()
  } catch (error) {
    res.json(new Fail({ msg: 'token已经过期，请重新登录', code: 401 }))
  }
}

module.exports = checkToken
