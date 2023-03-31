const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    //用户名字
    user_name: {
      type: String,
      required: true,
    },
    //用户密码
    password: {
      type: String,
      required: true,
    },
    //用户手机号
    account: {
      type: String,
      default: '',
    },
    //用户所属的角色
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'role',
      required: true,
    },
    //用户所属部门
    department_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'department',
      required: true,
    },
    //用户激活状态（默认为false）
    activation_status: {
      type: Boolean,
      default: false,
    },
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

const user = mongoose.model('user', userSchema)
module.exports = user
