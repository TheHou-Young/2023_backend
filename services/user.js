const userDao = require('../dao/user')
const roleDao = require('../dao/role')
const _ = require('lodash')

class UserService {
  /**
   * 创建新用户
   * @param userInfo 新用户的信息
   * @returns {Promise<*>}
   */
  async createUser(userInfo) {
    // const is_exit = await userDao.findUserByAccount(userInfo.account)
    // if (!_.isEmpty(is_exit)) {
    //   throw new Error('不允许重复创建')
    // }
    const defaultRole = await roleDao.getDefaultRole()
    const result = await userDao.createUser({
      ...userInfo,
      role_id: defaultRole._id,
    })
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
  }

  /**
   * 删除用户（逻辑删除）
   * @param account
   * @returns
   */
  async deleteUser({ account }) {
    const result = await userDao.updateDeleteStatus(account)
    if (_.isNil(result)) throw new Error('不允许删除不存在的账号')
    return result
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

  async getUserList({ account, role_id, department, activation_status, size, page }) {
    return await userDao.findUserList({
      account,
      department,
      role_id,
      activation_status,
      size,
      page,
    })
  }

  /**
   * 查询用户对应角色信息
   * @param account
   * @returns
   */
  async findUserRoleInfo(account) {
    return await userDao.findUserRoleInfo(account)
  }

  /**
   * 查询用户拥有的全部权限
   * @param account
   * @returns
   */
  async findUserPermissionList(account) {
    return await userDao.findUserPermissionList(account)
  }
}

const userService = new UserService()

module.exports = userService
