const userDao = require('../dao/userDao')
const roleDao = require('../dao/roleDao')

class UserService {
  /**
   * 创建新用户
   * @param userInfo 新用户的信息
   * @returns {Promise<*>}
   */
  async createUser(userInfo) {
    try {
      let is_exit = await userDao.findUserByAccount(userInfo.account)
      if (!is_exit) {
        return
      }
      const result = await userDao.createUser(userInfo)
      return result
    } catch (error) {
      throw new Error(e.message)
    }
  }

  /**
   * 激活用户
   * @param account 要激活的用户的account
   * @returns
   */
  async setActivationStatus(account) {
    try {
      const result = await userDao.findUserByAccount(account)
      let status = result.activation_status === 1 ? 0 : 1
      return await userDao.updateActivationStatus(account, status)
    } catch (error) {
      throw new Error(e.message)
    }
  }

  /**
   * 删除用户（逻辑删除）
   * @param account
   * @returns
   */
  async deleteUser(account) {
    try {
      const result = await userDao.findUserByAccount(account)
      if (result) return
      if (result.delete_status) {
        return
      } else {
        return await userDao.updateDeleteStatus(account)
      }
    } catch (error) {
      throw new Error(e.message)
    }
  }

  /**
   * 修改用户信息（包括用户所属的角色）
   * @param account
   * @param user_name
   * @param password
   * @param new_account
   * @param role_id
   * @returns
   */
  async updateUser({ account, user_name, password, new_account, role_id }) {
    return await userDao.updateUser({
      account,
      user_name,
      password,
      new_account,
      role_id,
    })
  }

  /**
   * 查找用户的信息
   * @param user_id
   * @returns
   */
  async findUserById(user_id) {
    return await userDao.findUserById(user_id)
  }

  async findUserList({ account, department, activation_status, size, page }) {
    return await userDao.findUserList({
      account,
      department,
      activation_status,
      size,
      page,
    })
  }

  async findUserRoleInfo(account) {}
}

const userService = new UserService()

module.exports = userService
