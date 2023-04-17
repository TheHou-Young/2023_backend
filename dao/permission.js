const permissionModel = require('../models/permission')

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

  //查询所有许可
  //TODO——不需要分页
  async findAllPermission() {
    return await permissionModel.find()
    // .skip((page - 1) * size)
    // .limit(size)
  }

  //查询多个许可
  async findPermissionsById(permission_ids) {
    return await permissionModel.find({ _id: { $in: permission_ids } })
  }

  async findPermissionByname(permission_name) {
    return await permissionModel.findOne({ permission_name })
  }
}

const permissionDao = new PermissionDao()

module.exports = permissionDao
