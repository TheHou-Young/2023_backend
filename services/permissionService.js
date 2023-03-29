const permissionDao = require("../dao/permissionDao")

class PermissionService {
  /**
   * 添加许可
   * @param permissionInfo
   * @returns
   */
  async createPermission(permissionInfo) {
    try {
      const result = await permissionDao.findPermissionByname(
        permissionInfo.permission_name
      )
      if (!is_exit) return
      else {
        return await permissionDao.createPermission(permissionInfo)
      }
    } catch (error) {
      throw new Error(e.message)
    }
  }

  /**
   * 删除许可（逻辑删除）
   * @param permission_id 
   * @returns 
   */
  async deletePermission(permission_id) {
    try {
      const result = await permissionDao.findPermissionById(permission_id)
      if (result) return
      if (result.delete_status) return
      else return await permissionDao.deletePermission(permission_id)
    } catch (error) {
      throw new Error(e.message)
    }
  }

  /**
   * 查询所需的所有许可
   * @param permission_ids 许可id的数组
   * @returns 
   */
  async findPermissions(permission_ids){
    try{
      //const permissions = []
      // permission_ids.map(async (permission_id)=>{
      //   const permission = await permissionDao.findPermissionById(permission_id)
      //   permissions.push(permission)
      // })
      return await permissionDao.findPermissionsById(permission_ids)
    }catch (error){
      throw new Error(e.message)
    }
  }
}

const permissionService = new PermissionService()

module.exports = permissionService
