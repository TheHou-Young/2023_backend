const mongoose = require("mongoose");

const permissionSchma = new mongoose.Schema({
  permission_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const permission = mongoose.model("permission", permissionSchma);
module.exports = permission;
