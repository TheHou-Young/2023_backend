const userDao = require('../dao/user')
const withTransaction = require('../utils/withTransaction')
const rewardRecordDao = require('../dao/rewardRecord')
const period = require('../utils/period')

class RecordService {
  checkIn = async ({ account, role_id, v_price }) => {
    await userDao.addVPrice({ account, role_id, v_price })
    const result = await rewardRecordDao.checkIn({ account, role_id })
    return result
  }

  refreshActiveTime = async ({ account, role_id, active_time }) => {
    const [left, right] = period()
    const result = await rewardRecordDao.refreshActiveTime({ account, role_id, active_time, left, right })
    return result
  }

  getActiveTimeInTimePeriod = async ({ account, role_id, before_time, after_time }) => await rewardRecordDao.getActiveTimeInTimePeriod({ account, role_id, before_time, after_time })

  addActiveVPrice = async ({ account, role_id, v_price }) => await userDao.addVPrice({ account, role_id, v_price })

  getMyCurrentRecord = async ({ account, role_id }) => {
    const [left, right] = period()
    return await rewardRecordDao.getMyCurrentRecord({ account, role_id, left, right })
  }
}

const recordService = new RecordService()

module.exports = recordService
