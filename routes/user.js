const express = require('express')
const wrapper = require('../utils/wrapper')
const userController = require('../controller/user')
const auth = require('../middlewares/auth')

const router = express.Router()

const API_ROUTE = {
  list: '/user/list',
  create: '/user/create',
  update: '/user/update',
  delete: '/user/delete',
}

router.get(API_ROUTE.list, auth(API_ROUTE.list), wrapper(userController.getUserList))
router.post(API_ROUTE.create, auth(API_ROUTE.create), wrapper(userController.createUser))
router.delete(API_ROUTE.delete, auth(API_ROUTE.delete), wrapper(userController.deleteUser))
router.patch(API_ROUTE.update, auth(API_ROUTE.update), wrapper(userController.updateUser))

router.get('/user/permission-list', wrapper(userController.getUserPermissionList))
router.post('/user/set-activation', wrapper(userController.setActivationStatus))

module.exports = router
