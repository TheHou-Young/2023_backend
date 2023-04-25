const express = require('express')
const wrapper = require('../utils/wrapper')
const permissionController = require('../controller/permission')

const router = express.Router()

router.post('/permission/create', wrapper(permissionController.createPermission))
router.get('/permission/list', wrapper(permissionController.getPermissionList))

module.exports = router
