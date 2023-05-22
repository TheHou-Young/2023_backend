const rewardRecordModel = require('../models/rewardRecord')
const period = require('../utils/period')

class RewardRecordDao {
  // 用户签到记录
  checkIn = async ({ account, role_id }, session) => {
    const result = await rewardRecordModel.create({ account, role_id }, { session })
    return result
  }

  // 重刷活跃时间
  refreshActiveTime = async ({ account, role_id, active_time, left, right }) => {
    const result = await rewardRecordModel.findOneAndUpdate({ account, role_id, check_in_time: { $gt: left, $lt: right } }, { active_time })
    return result
  }

  // 获取时间区间的活跃数据
  getActiveTimeInTimePeriod = async ({ account, role_id, before_time, after_time }) => {
    const result = await rewardRecordModel.find({ account, role_id, check_in_time: { $gt: before_time, $lt: after_time } })
    return result
  }

  getMyCurrentRecord = async ({ account, role_id, left, right }) => {
    const result = await rewardRecordModel.findOne({ account, role_id, check_in_time: { $gt: left, $lt: right } })
    return result
  }
}

const rewardRecordDao = new RewardRecordDao()

module.exports = rewardRecordDao
