const roleModel = require('../models/role')
const pagination = require('../utils/pagination')

class RoleDao {
  // 添加角色
  async createRole(roleInfo, session) {
    return await roleModel.create({ ...roleInfo }, { session })
  }

  // 删除角色
  // TODO: 后续不考虑角色删除
  async deleteRole(role_id, session) {
    return await roleModel.updateOne(
      { role_id },
      { delete_status: 1 },
      { session }
    )
  }

  // 修改角色
  async updateRole({ role_id, role_name, permission_ids }, session) {
    return await roleModel.updateOne(
      { role_id },
      {
        role_name,
        permission_ids,
      },
      { session }
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
    return await roleModel.findOne({ role_id }).populate('permission_ids')
  }

  // 获取角色列表
  async getRoleList({ role_name, permission_ids, size, page }) {
    const findRolesWithPermission = roleModel.aggregate([
      {
        $lookup: {
          from: 'permission',
          localField: 'permissions',
          foreignField: '_id',
          as: 'permissions',
        },
      },
      {
        $match: {
          'permissions._id': {
            $all: permission_ids ?? [],
          },
          role_name: {
            $regex: role_name ?? '',
          },
        },
      },
    ])
    return await pagination(findRolesWithPermission, {
      size,
      page,
    })
  }
}

const roleDao = new RoleDao()

module.exports = roleDao
