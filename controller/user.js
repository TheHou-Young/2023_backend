const roleService = require('../services/role')
const { toObjectId } = require('../utils/map')

// TODO: 数据合法性校验应该在controller做过滤
class UserController {
  getUserList = async (req) => {
    const {
      role_name = '',
      activation_status = 1,
      account,
      size,
      page,
    } = req.query
    return await roleService.getRoleList({
      role_name,
      activation_status,
      account,
      size,
      page,
    })
  }
}

const userController = new UserController()

module.exports = userController
