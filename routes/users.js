const express = require('express')
const wrapper = require('../utils/wrapper')
const userController = require('../controller/user')

const router = express.Router()

/* GET users listing. */
router.get('/user/list', wrapper(userController.getUserList))

module.exports = router
