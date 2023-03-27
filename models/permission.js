const mongoose = require('mongoose')

const permissionSchema = new mongoose.Schema(
  {
    permission_id: {
      type: Number,
      default: new Date(),
    },
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
      type: Number,
      required: true,
    },
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
