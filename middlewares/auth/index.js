const { redisClient } = require('../../config/db/redis')
const { verifyJwt } = require('../../utils/jwt')
const { toObjectId } = require('../../utils/map')
const roleModel = require('../../models/role')

// 获取用户下的所有权限
const permissionGetter = async (role_id) => {
  const result = await roleModel.aggregate([
    {
      $match: {
        _id: toObjectId(role_id),
      },
    },
    {
      $lookup: {
        from: 'permissions',
        localField: 'permission_ids',
        foreignField: '_id',
        as: 'permissions',
      },
    },
    {
      $project: {
        permissions: 1,
        role_id: 1,
      },
    },
  ])
  return result
}

const auth = async (req, _, next) => {
  const token = req?.headers?.authorization
  const { account, role_id } = verifyJwt(token)
  const object = await redisClient.get?.('*')
  const res = await permissionGetter(role_id)
  // console.log(object)
  next()
}

module.exports = auth
