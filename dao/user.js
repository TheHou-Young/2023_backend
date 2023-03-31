const userModel = require('../models/user')
const pagination = require('../utils/pagination')

class UserDao {
  // 根据手机号(账户)查询个人信息
  async findUserByAccount(account) {
    return await userModel.findOne({ account })
  }

  // 创建账户
  async createUser(userInfo, session) {
    return await userModel.create(
      {
        ...userInfo,
        activation_status: 1,
      },
      { session }
    )
  }

  // 激活账户
  async updateActivationStatus(account, status, session) {
    return await userModel.updateOne(
      { account },
      {
        activation_status: status,
      },
      {
        session,
      }
    )
  }

  // 软删账户
  async updateDeleteStatus(account, session) {
    return await userModel.updateOne(
      { account },
      {
        delete_status: 1,
      },
      {
        session,
      }
    )
  }

  // 更新账户信息
  async updateUser(
    { account, user_name, password, new_account, role_id },
    session
  ) {
    return await userModel.updateOne(
      { account },
      {
        user_name,
        password,
        role_id,
        account: new_account,
      },
      { session }
    )
  }

  // 根据用户id查找个人信息
  async findUserById(user_id) {
    return await userModel.findById(user_id)
  }

  //联表查询用户对应角色信息
  async findUserRoleInfo(account) {
    return await userModel.findOne({ account }).populate('role_id')
  }

  // 查询用户列表(分页)
  async findUserList({
    account,
    department,
    activation_status,
    delete_status,
    size,
    page,
  }) {
    return await pagination(
      userModel.find({
        account,
        department,
        activation_status,
        delete_status, // 不被删除的
      }),
      { size, page }
    )
  }
}

const userDao = new UserDao()

module.exports = userDao
