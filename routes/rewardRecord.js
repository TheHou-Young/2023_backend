const express = require('express')
const wrapper = require('../utils/wrapper')
const roleController = require('../controller/role')

const router = express.Router()

const API_ROUTE = {
  list: '/role/list',
  create: '/role/create',
  update: '/role/update',
  delete: '/role/delete',
}

router.get(API_ROUTE.list, wrapper(roleController.getRoleList))
router.post(API_ROUTE.create, wrapper(roleController.createRole))
router.patch(API_ROUTE.update, wrapper(roleController.updateRole))
router.get(API_ROUTE.delete, wrapper(roleController.deleteRole))

module.exports = router
