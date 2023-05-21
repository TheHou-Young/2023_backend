const permissionService = require('../services/permission')

class PermissionController {
  createPermission = async (req) => {
    const { permission_name, description, permission_pid = null } = req.body
    return await permissionService.createPermission({
      permission_name,
      description,
      permission_pid,
    })
  }

  getPermissionList = async (req) => {
    return await permissionService.findAllPermission()
  }
}

const permissionController = new PermissionController()

module.exports = permissionController
