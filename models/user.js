const mongoose = require("mongoose");

const userSchma = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: " ",
  },
  roles: {
    type: Array,
    required: true,
  },
  ativition_status: {
    type: Boolean,
    default: false,
  },
});

const user = mongoose.model("user", userSchma);
module.exports = user;
