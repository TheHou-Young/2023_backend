const userDao = require("../dao/userDao")
const roleDao = require("../dao/roleDao")

/**
 * 创建新用户
 * @param userInfo 新用户的信息
 * @returns {Promise<*>}
 */
async function createUser(userInfo) {
  try {
    let is_exit = await userDao.findUserByEmail(userInfo.email)
    if(!is_exit){
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
 * @param user_email 要激活的用户的email
 * @returns
 */
async function setActivationStatus(user_email) {
  try{
    const result = await userDao.findUserByEmail(user_email)
    let status = result.activation_status === 1 ? 0 : 1
    return await userDao.updateActivationStatus(user_email, status)
  }catch(error){
    throw new Error(e.message)
  }
}

/**
 * 删除用户（逻辑删除）
 * @param user_email
 * @returns 
 */
async function deleteUser(user_email) {
  try{
    const result = await userDao.findUserByEmail(user_email)
    if(result)return
    if(result.delete_status){
      return
    }else{
      return await userDao.updateDeleteStatus(user_email)
    }
  }catch(error){
    throw new Error(e.message)
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
async function updateUser(user_email, user_name, password, new_email, role_id) {
  try{
    return await userDao.updateUser(user_email, user_name, password, new_email, role_id)
  }catch(error){
    throw new Error(e.message)
  }
}

async function findUserById(user_id) {
  try{
    return await userDao.findUserById(user_id)
  }catch(error){
    throw new Error(e.message)
  }
}

async function findUsers() {}

async function findUserRole() {}
