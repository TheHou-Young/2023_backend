const path = require('path')
const _ = require('lodash')
const userModel = require('../models/user')
const roleModel = require('../models/role')
const permissionModel = require('../models/permission')
const { redisClient } = require('../config/db/redis')
const data = require('./data')

const loadScript = async () => {
  const userCount = await userModel.countDocuments()
  const roleCount = await roleModel.countDocuments()
  const permissionCount = await permissionModel.countDocuments()
  const redisCount =
    (await redisClient.mGet(Object.values(data.DEFAULT_ID))).filter(
      (value) => !_.isNil(value)
    )?.length ?? 0
  // 如果是空的，就加载默认数据
  switch (true) {
    case !userCount:
      await userModel.insertMany(data.DEFAULT_USERS)
    case !roleCount:
      await roleModel.insertMany(data.DEFAULT_ROLES)
    case !permissionCount:
      await permissionModel.insertMany(data.DEFAULT_PERMISSIONS)
    case !redisCount:
      await redisClient.mSet(data.REDIS_KEY_AND_VALUE)
    default:
      console.log('默认数据加载完成')
  }
}

module.exports = { loadScript }
