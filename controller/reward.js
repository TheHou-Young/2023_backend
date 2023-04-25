const recordService = require('../services/reward')

class RecordController {
  checkIn = async (req) => {
    const { my_account, my_role_id, v_price } = req.body
    const res = await recordService.checkIn({ account: my_account, role_id: my_role_id, v_price })
    return res
  }
}

const recordController = new RecordController()

module.exports = recordController
