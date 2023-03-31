const roleService = require('../services/role')

class RoleController {
  getRoleList = async (req, res) => {
    const { role_name, permission_ids, size, page } = req.query
    return await roleService.getRoleList({
      role_name,
      permission_ids,
      size,
      page,
    })
  }
}

const roleController = new RoleController()

module.exports = roleController
