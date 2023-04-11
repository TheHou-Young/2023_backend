const express = require('express')
const wrapper = require('../utils/wrapper')
const roleController = require('../controller/role')
const auth = require('../middlewares/auth')

const router = express.Router()

const API_ROUTE = {
  list: '/role/list',
  create: '/role/create',
  update: '/role/update',
  delete: '/role/delete',
}

router.get(API_ROUTE.list, auth(API_ROUTE.list), wrapper(roleController.getRoleList))
router.post(API_ROUTE.create, auth(API_ROUTE.create), wrapper(roleController.createRole))
router.put(API_ROUTE.update, auth(API_ROUTE.update), wrapper(roleController.updateRole))
router.get(API_ROUTE.delete, auth(API_ROUTE.delete), wrapper(roleController.deleteRole))

router.get('/role/options', wrap(roleController.getRoleLabelAndValue))

module.exports = router
