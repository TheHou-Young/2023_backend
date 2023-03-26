const mongoose = require("mongoose")

const userSchma = new mongoose.Schema(
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
    email: {
      type: String,
      default: " ",
    },
    //用户所属的角色
    role: {
      type: Number,
      required: true,
    },
    //用户激活状态（默认为false）
    ativition_status: {
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
      createdAt: "created",
      updatedAt: "updated",
    },
  }
)

const user = mongoose.model("user", userSchma)
module.exports = user
