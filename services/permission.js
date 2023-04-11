const permissionDao = require('../dao/permission')
const _ = require('lodash')

class PermissionService {
  /**
   * 添加许可
   * @param permissionInfo
   * @returns
   */
  async createPermission(permissionInfo) {
    const result = await permissionDao.findPermissionByname(permissionInfo.permission_name)
    if (!_.isEmpty(result)) {
      throw new Error('该许可已经存在')
    } else {
      return await permissionDao.createPermission(permissionInfo)
    }
  }

  /**
   * 删除许可（逻辑删除）
   * @param permission_id
   * @returns
   */
  // TODO——许可不可删除
  async deletePermission(permission_id) {
    const result = await permissionDao.findPermissionById(permission_id)
    if (result) return
    if (result.delete_status) return
    else return await permissionDao.deletePermission(permission_id)
  }

  /**
   * 查询数据库中所有的Permission
   * @returns
   */
  async findAllPermission() {
    return await permissionDao.findAllPermission()
  }

  /**
   * 查询所需的所有许可
   * @param permission_ids 许可id的数组
   * @returns
   */
  async findPermissions(permission_ids) {
    //const permissions = []
    // permission_ids.map(async (permission_id)=>{
    //   const permission = await permissionDao.findPermissionById(permission_id)
    //   permissions.push(permission)
    // })
    return await permissionDao.findPermissionsById(permission_ids)
  }
}

const permissionService = new PermissionService()

module.exports = permissionService
