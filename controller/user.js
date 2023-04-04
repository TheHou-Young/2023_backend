const userService = require('../services/user')

class UserController {
  getUserList = async (req) => {
    const {
      role_name = '',
      activation_status = null,
      account,
      size,
      page,
    } = req.query
    return await userService.getUserList({
      role_name,
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
}

const userController = new UserController()

module.exports = userController
