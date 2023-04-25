const userService = require('../services/user')

class UserController {
  getUserList = async (req) => {
    const { role_id = '', activation_status, account = '', size, page } = req.query
    return await userService.getUserList({
      role_id,
      activation_status,
      account,
      size,
      page,
    })
  }

  createUser = async (req) => {
    const { user_name, password, account } = req.body
    return await userService.createUser({ user_name, password, account })
  }

  deleteUser = async (req) => {
    const { account } = req.body
    return await userService.deleteUser({ account })
  }

  updateUser = async (req) => {
    const { account, user_name = null, password = null, new_account, role_id = null } = req.body
    return await userService.updateUser({
      account,
      user_name,
      password,
      new_account,
      role_id,
    })
  }

  getUserPermissionList = async (req) => {
    const { my_account } = req.headers
    return await userService.findUserPermissionList(my_account)
  }

  setActivationStatus = async (req) => {
    const { my_account } = req.headers
    return await userService.setActivationStatus(my_account)
  }
}

const userController = new UserController()

module.exports = userController
