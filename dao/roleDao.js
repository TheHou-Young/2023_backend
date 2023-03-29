const roleModel = require("../models/role")

class RoleDao {
  // 添加角色
  async createRole(roleInfo) {
    return await roleModel.create({ ...roleInfo })
  }

  // 删除角色
  async deleteRole(role_id) {
    return await roleModel.updateOne({ role_id }, { delete_status: 1 })
  }

  // 修改角色
  async updateRole({ role_id, role_name, permission_ids }) {
    return await roleModel.updateOne(
      { role_id },
      {
        role_name,
        permission_ids,
      }
    )
  }

  // 查询角色
  async findRoleById(role_id) {
    return await roleModel.findById(role_id)
  }

  async findRoleByName(role_name) {
    return await roleModel.findOne({ role_name })
  }

  //查询角色所有权限信息
  async findRolePermissionInfo(role_id) {
    return await roleModel.findOne({ role_id }).populate("permission_ids")
  }

  // 获取角色列表
}

const roleDao = new RoleDao()

module.exports = roleDao
