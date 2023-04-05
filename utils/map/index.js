const mongoose = require('mongoose')

const toObjectId = (item) => new mongoose.Types.ObjectId(item)

module.exports = {
  toObjectId,
}
