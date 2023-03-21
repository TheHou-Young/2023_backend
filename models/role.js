const mongoose = require("mongoose");

const roleSchma = new mongoose.Schema({
  role_name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    type: Array,
    required: true,
  },
});

const role = mongoose.model("role", roleSchma);
module.exports = role;
