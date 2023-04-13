const loginService = require('../services/login')

class LoginController {
  login = async (req, res) => {
    const { account, password, role_id } = req.body
    const { user, access_token, refresh_token } = await loginService.login({
      account,
      password,
      role_id,
    })
    //res.set('Authorization', access_token)
    //res.cookie('refresh_token', refresh_token, { httpOnly: true })
    return { user, refresh_token, access_token }
  }

  updateAccessToken = async (req, res) => {
    const { refresh_token } = req.body
    const { access_token } = await loginService.updateAccessToken({
      refresh_token,
    })
    //res.set('Authorization', access_token)
    return { access_token }
  }

  logout = async (req) => {
    const { refresh_token } = req.body
    return await loginService.logout({ refresh_token })
  }
}

const loginController = new LoginController()
module.exports = loginController
