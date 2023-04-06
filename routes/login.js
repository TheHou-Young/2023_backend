const express = require("express")
const wrapper = require("../utils/wrapper")
const loginController = require("../controller/login")

const router = express.Router()

router.post("/login", wrapper(loginController.login))

module.exports = router
