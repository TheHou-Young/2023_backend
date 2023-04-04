const express = require('express')
const wrapper = require('../utils/wrapper')
const userController = require('../controller/user')

const router = express.Router()

router.get('/user/list', wrapper(userController.getUserList))
router.post('/user/create', wrapper(userController.createUser))

module.exports = router
