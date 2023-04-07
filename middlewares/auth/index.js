const { redisClient } = require('../../config/db/redis')
const { verifyJwt } = require('../../utils/jwt')
const user = require('../../models/user')

// 获取用户下的所有权限
const permissionGetter = async (account) => {
  const result = await user.aggregate([
    {
      $match: {
        account: { $regex: account },
      },
    },
    {
      $lookup: {
        from: 'roles',
        localField: 'role_id',
        foreignField: '_id',
        as: 'role',
      },
    },
    {
      $lookup: {
        from: 'permissions',
        localField: 'role.permission_ids',
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
  const { account, role_id } = await verifyJwt(token)
  console.log(account, role_id)
  const object = await redisClient.get(role_id)

  const res = await permissionGetter(account)
  console.log(JSON.stringify(res))
  next()
}

module.exports = auth
