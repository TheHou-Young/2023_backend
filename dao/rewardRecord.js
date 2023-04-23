const rewardRecordModel = require('../models/rewardRecord')

class RewardRecordDao {
  // 用户签到
  checkIn = async ({ account }, session) => {
    const result = await rewardRecordModel.create({ account }, { session })
    return result
  }

  // 重刷活跃时间
  refreshActiveTime = async (account, active_time) => {
    const result = await rewardRecordModel.findOneAndUpdate({ account }, { active_time })
    return result
  }

  // 获取时间区间的活跃数据
  getActiveTimeInTimePeriod = async (before_time, after_time) => {
    const result = await rewardRecordModel.find({ check_in_time: { $gt: before_time, $lt: after_time } })
  }
}

const rewardRecordDao = new RewardRecordDao()

module.exports = rewardRecordDao
