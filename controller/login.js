const loginService = require('../services/login')

class LoginController {
  login = async (req, res) => {
    const { account, password } = req.body
    const { user, access_token, refresh_token } = await loginService.login({
      account,
      password,
    })
    res.set('Authorization', access_token)
    res.cookie('refresh_token', refresh_token, { httpOnly: true });
    return user
  }
}

const loginController = new LoginController()
module.exports = loginController
