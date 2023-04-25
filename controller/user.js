const userService = require('../services/user')
const desensitize = require('../utils/desensitize')

class UserController {
  getUserList = async (req) => {
    const { role_id = '', activation_status, account = '', size, page } = req.query
    const result = await userService.getUserList({
      role_id,
      activation_status,
      account,
      size,
      page,
    })
    return desensitize(result)
  }

  createUser = async (req) => {
    const { user_name, password, account } = req.body
    const result = await userService.createUser({ user_name, password, account })
    return desensitize(result)
  }

  deleteUser = async (req) => {
    const { account } = req.body
    const result = await userService.deleteUser({ account })
    return desensitize(result)
  }

  updateUser = async (req) => {
    const { account, user_name = null, password = null, new_account, role_id = null } = req.body
    const result = await userService.updateUser({
      account,
      user_name,
      password,
      new_account,
      role_id,
    })
    return desensitize(result)
  }

  getUserPermissionList = async (req) => {
    const { my_account } = req.query
    return await userService.findUserPermissionList(my_account)
  }

  setActivationStatus = async (req) => {
    const { account } = req.body
    const result = await userService.setActivationStatus(account)
    return desensitize(result)
  }
}

const userController = new UserController()

module.exports = userController
