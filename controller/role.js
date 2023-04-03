const roleService = require('../services/role')
const { toObjectId } = require('../utils/map')

// TODO: 数据合法性校验应该在controller做过滤
class RoleController {
  getRoleList = async (req) => {
    const { role_name = '', permission_ids = null, size, page } = req.query
    const realPermissionIds = permission_ids?.map(toObjectId) ?? []
    return await roleService.getRoleList({
      role_name,
      permission_ids: realPermissionIds,
      size,
      page,
    })
  }

  createRole = async (req) => {
    const { role_name, permission_ids } = req.body
    const realPermissionIds = permission_ids?.map(toObjectId)
    return await roleService.createRole({
      role_name,
      permission_ids: realPermissionIds,
    })
  }

  updateRole = async (req) => {
    const { role_id, role_name = null, permission_ids = null } = req.body
    const realPermissionIds = permission_ids?.map(toObjectId)
    return await roleService.updateRole({
      role_id: toObjectId(role_id),
      role_name,
      permission_ids: realPermissionIds,
    })
  }

  getRole = async (req) =>{
    const { role_id } = req.query
    return await roleService.findRolePermissionInfo(
      toObjectId(role_id)
    )
  }
}

const roleController = new RoleController()

module.exports = roleController
