const path = require('path')
const _ = require('lodash')
const userModel = require('../models/user')
const roleModel = require('../models/role')
const permissionModel = require('../models/permission')
const { redisClient } = require('../config/db/redis')
const { finishInWhichDB } = require('../redis/permission')
const { REDIS_DB } = require('../public/constants')
const data = require('./data')

const loadScript = async () => {
  const userCount = await userModel.countDocuments()
  const roleCount = await roleModel.countDocuments()
  const permissionCount = await permissionModel.countDocuments()
  await finishInWhichDB(REDIS_DB.permission, async (redisClient) => {
    const allKeys = await redisClient.keys('*')
    if (!allKeys.length) {
      let params = null
      if (!permissionCount) params = data.REDIS_KEY_AND_VALUE
      else {
        const result = await roleModel.aggregate([
          {
            $lookup: {
              from: 'permissions',
              localField: 'permission_ids',
              foreignField: '_id',
              as: 'permissions',
            },
          },
        ])
        params = result.reduce((res, item) => {
          return {
            ...res,
            [item._id?.toString()]: JSON.stringify(item.permissions),
          }
        }, {})
      }
      await redisClient.mSet(params)
    }
  })

  // 如果是空的，就加载默认数据
  switch (true) {
    case !userCount:
      await userModel.insertMany(data.DEFAULT_USERS)
    case !roleCount:
      await roleModel.insertMany(data.DEFAULT_ROLES)
    case !permissionCount:
      await permissionModel.insertMany(data.DEFAULT_PERMISSIONS)
    default:
      console.log('默认数据加载完成')
  }
}

module.exports = { loadScript }
