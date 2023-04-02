const express = require('express')
const wrapper = require('../utils/wrapper')
const roleController = require('../controller/role')

const router = express.Router()

router.get('/role/list', wrapper(roleController.getRoleList))
router.get('/role/create', wrapper(roleController.createRole))

module.exports = router
