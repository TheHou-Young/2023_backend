const mongoose = require('mongoose')

const withTransaction = async (fn) => {
  const session = await mongoose.startSession()
  try {
    await fn(session)
    await session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
  } finally {
    await session.endSession()
  }
}

module.exports = withTransaction
