const permissionModel = require("../models/permission")

class PermissionDao {
  //添加许可
  async createPermission(permissionInfo) {
    return await permissionModel.create({ ...permissionInfo })
  }

  //删除许可
  async deletePermission(permission_id) {
    return await permissionModel.findByIdAndUpdate(permission_id, {
      delete_status: 1,
    })
  }
  
  //查询许可
  async findPermissionById(permission_id) {
    return await permissionModel.findById(permission_id)
  }

  async findPermissionByname(permission_name) {
    return await permissionModel.findOne({ permission_name })
  }

  //修改许可
}

const permissionDao = new PermissionDao()

module.exports = permissionDao
