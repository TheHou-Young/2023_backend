const express = require('express')
const wrapper = require('../utils/wrapper')
const userController = require('../controller/user')

const router = express.Router()

router.get('/user/list', wrapper(userController.getUserList))
router.post('/user/create', wrapper(userController.createUser))
router.delete('/user/delete', wrapper(userController.deleteUser))
router.patch('/user/update', wrapper(userController.updateUser))

router.get('/user/permissionList', wrapper(userController.getUserPermissionList))

module.exports = router
