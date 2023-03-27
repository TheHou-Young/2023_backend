const { connectMongoDB } = require('./mongodb')
const { connectRedis } = require('./redis')

const connectDB = () => {
  // mongodb连接
  connectMongoDB()
  // redis连接
  connectRedis()
}

module.exports = connectDB
