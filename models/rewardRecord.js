const mongoose = require('mongoose')

// 用于记录某个用户当天的奖励
const rewardRecordSchema = new mongoose.Schema(
  {
    account: {
      type: String,
      default: '',
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'role',
      required: true,
    },
    // 签到时间(跟创建时间基本一致)
    check_in_time: {
      type: Number,
    },
    // 活跃持续时间
    active_time: {
      type: Number,
      default: 0,
    },
    updated: {
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: 'check_in_time',
      updatedAt: 'updated',
    },
  }
)

const rewardRecord = mongoose.model('rewardRecord', rewardRecordSchema)
module.exports = rewardRecord
