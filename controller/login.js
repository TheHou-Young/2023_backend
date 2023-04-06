const loginService = require('../services/login')

class LoginController {
  login = async (req, res) => {
    const { account, password } = req.body
    const { user, token } = await loginService.login({
      account,
      password,
    })
    res.set('Authorization', token)
    return user
  }
}

const loginController = new LoginController()
module.exports = loginController
