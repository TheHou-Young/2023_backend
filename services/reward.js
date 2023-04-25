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

  refreshActiveTime = async ({ account, role_id, active_time }) => await rewardRecordModel.refreshActiveTime({ account, role_id, active_time })

  getActiveTimeInTimePeriod = async ({ account, role_id, before_time, after_time }) => await rewardRecordModel.getActiveTimeInTimePeriod({ account, role_id, before_time, after_time })

  addActiveVPrice = async ({ account, role_id, v_price }) => await userModel.addVPrice({ account, role_id, v_price })
}

const recordService = new RecordService()

module.exports = recordService
