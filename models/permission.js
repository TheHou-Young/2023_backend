const mongoose = require('mongoose')

const permissionSchema = new mongoose.Schema(
  {
    //权限名字
    permission_name: {
      type: String,
      required: true,
    },
    //权限描述
    description: {
      type: String,
      required: true,
    },
    //权限的父id
    permission_pid: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    //页面or按钮
    type: {
      type: Number,
      enum: [1, 2], // 1-页面，2-按钮
      required: true,
      default: 1,
    },
    //调用后端接口鉴权使用
    api_route_name: {
      type: String,
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

const permission = mongoose.model('permission', permissionSchema)
module.exports = permission
