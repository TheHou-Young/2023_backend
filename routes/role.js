const express = require('express')
const wrapper = require('../utils/wrapper')
const roleController = require('../controller/role')

const router = express.Router()

router.get('/role/list', wrapper(roleController.getRoleList))
//TODO 创建用户请求应该时post
router.post('/role/create', wrapper(roleController.createRole))
router.put('/role/update', wrapper(roleController.updateRole))
router.get('/role/get', wrapper(roleController.getRole))

module.exports = router
