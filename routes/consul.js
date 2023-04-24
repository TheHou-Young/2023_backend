const express = require('express')
const wrapper = require('../utils/wrapper')

const router = express.Router()

router.get('/health', function (req, res, next){
  res.send("user_manage service on consul is OK!");
})

module.exports = router