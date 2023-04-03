const roleService = require('../services/role')

// TODO: 数据合法性校验应该在controller做过滤
class RoleController {
  getRoleList = async (req) => {
    const { role_name, permission_ids, size, page } = req.query
    return await roleService.getRoleList({
      role_name,
      permission_ids,
      size,
      page,
    })
  }

  createRole = async (req) => {
    const { role_name, permission_ids } = req.body
    return await roleService.createRole({ role_name, permission_ids })
  }

  updateRole = async (req) => {
    const { role_id, role_name, permission_ids } = req.body
    return await roleService.updateRole({ role_id, role_name, permission_ids })
  }
}

const roleController = new RoleController()

module.exports = roleController
