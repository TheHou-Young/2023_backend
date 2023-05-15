const _ = require('lodash')
const { redisClient } = require('../config/db/redis')
const { REDIS_DB } = require('../public/constants')

const finishInWhichDB = async (dbIndex, fn) => {
  let result = null
  try {
    await redisClient.select(dbIndex)
    result = await fn?.(redisClient)
    await redisClient.select(REDIS_DB.login)
  } catch (error) {
    throw new Error('切换失败')
  }
  return result
}

const setPermissionCache = async (permissions, role_id) => {
  return await finishInWhichDB(REDIS_DB.permission, async () => {
    return await redisClient.set(role_id, JSON.stringify(permissions))
  })
}

// 判断是否含有该权限
const isExistPermission = async (role_id, api_route_name) => {
  return await finishInWhichDB(REDIS_DB.permission, async () => {
    const allPermissions = await redisClient.get(role_id)
    return !_.isEmpty(allPermissions.filter((permission) => permission.api_route_name === api_route_name))
  })
}

module.exports = {
  finishInWhichDB,
  setPermissionCache,
  isExistPermission,
}
