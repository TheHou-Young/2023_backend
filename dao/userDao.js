const userModel = require('../models/user')
const roleModel = require("../models/role")
const user = require('../models/user')

class UserDao {

  async findUserByEmail(user_email){
    return await userModel.findOne({email: user_email})
  }

  async createUser(userInfo) {
    return await userModel.create({
      ...userInfo,
      activation_status: 1,
    })
  }

  async updateActivationStatus(user_email, status){
    return await userModel.updateOne({email: user_email},{
      activation_status: status
    })
  }

  async updateDeleteStatus(user_email){
    return userModel.updateOne({email: user_email},{
      delete_status: 1
    })
  }

  async updateUser(user_email, user_name, password, new_email, role_id){
    return await userModel.updateOne({email: user_email},{
      user_name: user_name,
      password: password,
      email: new_email,
      role_id: role_id
    })
  }

  async findUserById(user_id){
    return await userModel.findById(user_id)
  }

  // 添加角色
  // 删除角色
  // 修改角色
  // 获取角色列表
}

const userDao = new UserDao()

module.exports = userDao
