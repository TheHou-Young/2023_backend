const roleModel = require('../models/role')
const pagination = require('../utils/pagination')
const { toObjectId } = require('../utils/map')
const lodash = require('lodash')

class RoleDao {
  // 添加角色
  async createRole({ role_name, permission_ids }) {
    return await roleModel.create({ role_name, permission_ids })
  }

  // 删除角色
  // TODO——删除角色 并且删除使用了该角色的用户
  async deleteRole(role_id, session) {
    return await roleModel.updateOne({ _id: role_id }, { delete_status: 1 }, { session })
  }

  // 修改角色
  async updateRole({ role_id, role_name, permission_ids }, session) {
    return await roleModel.updateOne(
      { _id: role_id },
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
  //TODO——连接后并没查询到permission表的内容
  async findRolePermissionInfo(role_id) {
    const data = await roleModel.findById(role_id).populate('permission_ids').exec()
    //console.log(data.permission_ids)
    return data
  }

  // 获取角色列表
  async getRoleList({ role_id = '', permission_ids = [], size, page }) {
    const matchPip = {}
    if (!lodash.isEmpty(role_id)) matchPip.role_id = toObjectId(role_id)
    if (!lodash.isEmpty(permission_ids)) matchPip.permission_ids = { $in: permission_ids?.map(toObjectId) }

    const findRolesWithPermission = pagination({
      model: roleModel,
      matchPip,
      listPip: [
        {
          $lookup: {
            from: 'permissions',
            localField: 'permission_ids',
            foreignField: '_id',
            as: 'permissions',
          },
        },
      ],
      options: { size, page },
    })
    return await findRolesWithPermission
  }

  async getPermissions(role_id) {
    const [res] = await roleModel.aggregate([
      {
        $match: { _id: toObjectId(role_id) },
      },
      {
        $lookup: {
          from: 'permissions',
          localField: 'permission_ids',
          foreignField: '_id',
          as: 'permissions',
        },
      },
    ])
    return res?.permissions ?? []
  }

  async getDefaultRole() {
    return await roleModel.findOne()
  }

  async getRoleLabelAndValue() {
    return await roleModel.find(
      {},
      {
        _id: 1,
        role_name: 1,
      }
    )
  }
}

const roleDao = new RoleDao()

module.exports = roleDao
