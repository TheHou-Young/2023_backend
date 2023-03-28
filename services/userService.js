const userDao = require('../dao/userDao')

class UserService {
  /**
   * 创建新用户
   * @param userInfo 新用户的信息
   * @returns {Promise<*>}
   */
  async createUser(userInfo) {
    let is_exit = await userDao.findUserByAccount(userInfo.account)
    if (!is_exit) {
      return
    }
    const result = await userDao.createUser(userInfo)
    return result
  }

  /**
   * 激活用户
   * @param account 要激活的用户的account
   * @returns
   */
  async setActivationStatus(account) {
    const result = await userDao.findUserByAccount(account)
    let status = result.activation_status === 1 ? 0 : 1
    return await userDao.updateActivationStatus(account, status)
    throw new Error(e.message)
  }

  /**
   * 删除用户（逻辑删除）
   * @param account
   * @returns
   */
  async deleteUser(account) {
    const result = await userDao.findUserByAccount(account)
    if (result) return
    if (result.delete_status) {
      return
    } else {
      return await userDao.updateDeleteStatus(account)
    }
  }

  /**
   * 修改用户信息（包括用户所属的角色）
   * @param user_email
   * @param user_name
   * @param password
   * @param new_email
   * @param role_id
   * @returns
   */
  async updateUser({ user_email, user_name, password, new_email, role_id }) {
    return await userDao.updateUser({
      user_email,
      user_name,
      password,
      new_email,
      role_id,
    })
  }

  async findUserById(user_id) {
    return await userDao.findUserById(user_id)
  }

  async findUsers() {}

  async findUserRole() {}
}

const userService = new UserService()

module.exports = userService
