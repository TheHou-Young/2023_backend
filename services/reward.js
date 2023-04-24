const userModel = require('../dao/user')
const rewardRecordModel = require('../dao/rewardRecord')
const withTransaction = require('../utils/withTransaction')

class RecordService {
  checkIn = async ({ account, role_id, v_price }) => {
    const res = await withTransaction(async (session) => {
      const result = await userModel.addVPrice({ account, role_id, v_price }, session)
      await rewardRecordModel.checkIn({ account, role_id }, session)
      return result
    })
    return res
  }
}

const recordService = new RecordService()

module.exports = recordService
