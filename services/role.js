const roleDao = require('../dao/role')
const _ = require('lodash')
const { setPermissionCache } = require('../redis/permission')
const { toObjectId } = require('../utils/map')

class RoleService {
  /**
   * 添加新角色
   * @param roleInfo
   * @returns
   */
  async createRole({ role_name, permission_ids }) {
    let is_exit = await roleDao.findRoleByName(role_name)
    if (!_.isEmpty(is_exit)) {
      throw new Error('已有该名称的角色，请更换名称')
    } else {
      const _id = toObjectId()
      const res = await roleDao.createRole({ role_name, permission_ids, _id: toObjectId(_id) })
      const permissions = await roleDao.getPermissions(_id)
      setPermissionCache(permissions, _id.toString())
      return res
    }
  }

  /**
   * 删除角色（软删）
   * @param role_id
   * @returns
   */
  async deleteRole(role_id) {
    const result = await roleDao.findRoleById(role_id)
    if (_.isEmpty(result)) {
      throw new Error('没有该角色')
    }
    if (result.delete_status) {
      throw new Error('该角色已经被删除')
    } else {
      return await roleDao.deleteRole(role_id)
    }
  }

  /**
   * 更新角色
   * @param {*} param
   * @returns
   */
  async updateRole({ role_id, role_name, permission_ids }) {
    const res = await roleDao.updateRole({ role_id, role_name, permission_ids })
    const permissions = await roleDao.getPermissions(role_id)
    setPermissionCache(permissions, role_id)
    return res
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

  getRoleList = async ({ role_id, permission_ids, size, page }) => await roleDao.getRoleList({ role_id, permission_ids, size, page })

  getRoleLabelAndValue = async () => {
    const daoData = await roleDao.getRoleLabelAndValue()
    return daoData.map(({ role_name, _id }) => ({ label: role_name, value: _id.toString() }))
  }
}

const roleService = new RoleService()

module.exports = roleService
