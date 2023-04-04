const roleDao = require('../dao/role')
const _ = require("lodash")

class RoleService {
  /**
   * 添加新角色
   * @param roleInfo
   * @returns
   */
  async createRole({ role_name, permission_ids }) {
    let is_exit = await roleDao.findRoleByName(role_name)
    if (!_.isEmpty(is_exit)) {
      return new Error('已有该名称的角色，请更换名称')
    }
    else {
      return await roleDao.createRole({ role_name, permission_ids })
    }
  }

  /**
   * 删除角色（软删）
   * @param role_id
   * @returns
   */
  async deleteRole(role_id) {
    const result = await roleDao.findRoleById(role_id)
    if (result) return
    if (result.delete_status) return
    else {
      return await roleDao.deleteRole(role_id)
    }
  }

  /**
   * 更新角色
   * @param {*} param
   * @returns
   */
  async updateRole({ role_id, role_name, permission_ids }) {
    return await roleDao.updateRole({ role_id, role_name, permission_ids })
  }

  /**
   * 查询角色信息
   * @param role_id
   * @returns
   */
  async findRole(role_id) {
    return await roleDao.findRoleById(role_id)
  }

  /**
   * 查询角色所有的权限信息
   * @param role_id
   * @returns
   */
  async findRolePermissionInfo(role_id) {
    return await roleDao.findRolePermissionInfo(role_id)
  }

  getRoleList = async ({ role_name, permission_ids, size, page }) =>
    await roleDao.getRoleList({ role_name, permission_ids, size, page })
}

const roleService = new RoleService()

module.exports = roleService
