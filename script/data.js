const { toObjectId } = require('../utils/map')

const userManagementId = toObjectId()
const userListId = toObjectId()
const roleListId = toObjectId()
const createUserId = toObjectId()
const updateUserId = toObjectId()
const deleteUserId = toObjectId()
const createRoleId = toObjectId()
const updateRoleId = toObjectId()
const deleteRoleId = toObjectId()
const DEFAULT_PERMISSIONS = [
  {
    permission_name: '用户管理',
    description: '管理员端页面管制',
    permission_pid: null,
    type: 1,
    api_route_name: '/user',
    _id: userManagementId,
  },
  {
    permission_name: '用户列表',
    description: '管理员端用户控制',
    permission_pid: userManagementId,
    type: 1,
    api_route_name: '/user/list',
    _id: userListId,
  },
  {
    permission_name: '角色管理',
    description: '管理员端页面管制',
    permission_pid: userManagementId,
    type: 1,
    api_route_name: '/role/list',
    _id: roleListId,
  },
  {
    permission_name: '创建用户',
    description: '用户列表创建用户用',
    permission_pid: userListId,
    type: 2,
    api_route_name: '/user/create',
    _id: createUserId,
  },
  {
    permission_name: '删除用户',
    description: '用户列表删除用户用',
    permission_pid: userListId,
    type: 2,
    api_route_name: '/user/delete',
    _id: deleteUserId,
  },
  {
    permission_name: '修改用户',
    description: '用户列表修改用户用',
    permission_pid: userListId,
    type: 2,
    api_route_name: '/user/update',
    _id: updateUserId,
  },
  {
    permission_name: '创建角色',
    description: '用户列表创建角色用',
    permission_pid: roleListId,
    type: 2,
    api_route_name: '/role/create',
    _id: createRoleId,
  },
  {
    permission_name: '删除角色',
    description: '用户列表删除角色用',
    permission_pid: roleListId,
    type: 2,
    api_route_name: '/role/delete',
    _id: deleteRoleId,
  },
  {
    permission_name: '修改角色',
    description: '用户列表修改角色用',
    permission_pid: roleListId,
    type: 2,
    api_route_name: '/role/update',
    _id: updateRoleId,
  },
]

const studentId = toObjectId()
const expertId = toObjectId()
const adminId = toObjectId()
const DEFAULT_ID = {
  studentId: studentId.toString(),
  expertId: expertId.toString(),
  adminId: adminId.toString(),
}
const DEFAULT_ROLES = [
  {
    role_name: '学生',
    permission_ids: [],
    _id: studentId,
  },
  {
    role_name: '专家',
    permission_ids: [],
    _id: expertId,
  },
  {
    role_name: '管理员',
    permission_ids: [
      userManagementId,
      userListId,
      roleListId,
      createUserId,
      updateUserId,
      deleteUserId,
      createRoleId,
      updateRoleId,
      deleteRoleId,
    ],
    _id: adminId,
  },
]

const DEFAULT_USERS = [
  {
    user_name: '林凯迪',
    password: 'qwer1234',
    account: '12345678900',
    role_id: adminId,
  },
  {
    user_name: '侯斯扬',
    password: 'qwer1234',
    account: '12345678901',
    role_id: adminId,
  },
]

const REDIS_KEY_AND_VALUE = {
  [DEFAULT_ID.adminId]: JSON.stringify(DEFAULT_PERMISSIONS),
  [DEFAULT_ID.expertId]: JSON.stringify([]),
  [DEFAULT_ID.studentId]: JSON.stringify([]),
}

module.exports = {
  DEFAULT_PERMISSIONS,
  DEFAULT_ROLES,
  DEFAULT_USERS,
  REDIS_KEY_AND_VALUE,
  DEFAULT_ID,
}
