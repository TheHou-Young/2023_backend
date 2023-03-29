const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema(
  {
    //角色名字
    role_name: {
      type: String,
      required: true,
      unique: true,
    },
    //角色所拥有的权限
    permission_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'permission',
    }],
    //数据是否删除
    delete_status: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    created: {
      type: Number,
    },
    updated: {
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
)

const role = mongoose.model('role', roleSchema)
module.exports = role
