var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/user-test', function (req, res, next) {
  res.send({ a: 1 })
})

module.exports = router
