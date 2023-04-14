const { verifyJwt } = require('../../utils/jwt')
const { REDIS_DB } = require('../../public/constants')
const { finishInWhichDB } = require('../../redis/permission') // 这个函数后续再整理到utils
const { Fail } = require('../../utils/result')

// TODO by Kaidi：auth拦截如果调用数据库来判断权限，会有至少2个RTT的时间开销，至少200ms的延迟，考虑这里使用内存或者redis缓存
/**
 * 经过个人api调用测试来看，采用数据库查询的方式，接口平均响应时间为420ms以上
 * 而采用缓存的平均响应则在280-320ms之间
 */
const auth = (api_route_name) => async (req, res, next) => {
  const token = req?.headers?.authorization
  const { role_id } = verifyJwt(token)
  const permissionsString = await finishInWhichDB(REDIS_DB.permission, async (redisClient) => {
    return await redisClient.get(role_id)
  })
  const reg = new RegExp(api_route_name)
  const isHaveOperatePermission = reg.test(permissionsString)
  if (isHaveOperatePermission) next()
  else res.json(new Fail({ msg: '你没有对应的操作权限！' }))
}

module.exports = auth
