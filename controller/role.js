const roleService = require('../services/role')
const { toObjectId } = require('../utils/map')

// TODO: 数据合法性校验应该在controller做过滤
class RoleController {
  getRoleList = async (req) => {
    const { role_id = '', permission_ids = [], size, page } = req.query
    return await roleService.getRoleList({
      role_id,
      permission_ids,
      size,
      page,
    })
  }

  createRole = async (req) => {
    const { role_name, permission_ids } = req.body
    return await roleService.createRole({
      role_name,
      permission_ids,
    })
  }

  updateRole = async (req) => {
    const { role_id, role_name = null, permission_ids = null } = req.body
    return await roleService.updateRole({
      role_id,
      role_name,
      permission_ids,
    })
  }

  getRole = async (req) => {
    const { role_id } = req.query
    return await roleService.findRolePermissionInfo(role_id)
  }

  deleteRole = async (req) => {
    const { role_id } = req.body
    return await roleService.deleteRole(role_id)
  }

  getRoleLabelAndValue = async (_) => {
    return await roleService.getRoleLabelAndValue()
  }
}

const roleController = new RoleController()

module.exports = roleController
