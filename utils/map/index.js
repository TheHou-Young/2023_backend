const mongoose = require('mongoose')

const toObjectId = (item) => mongoose.Types.ObjectId(item)

module.exports = {
  toObjectId,
}
