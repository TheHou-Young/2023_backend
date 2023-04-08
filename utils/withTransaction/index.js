const mongoose = require('mongoose')

const withTransaction = async (fn) => {
  const session = await mongoose.startSession()
  let result = null
  try {
    result = await fn(session)
    await session.commitTransaction()
  } catch (_) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
  return result
}

module.exports = withTransaction
