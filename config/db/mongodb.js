const _ = require('mongoose')

const connectMongoDB = (mongoose = _) => {
  mongoose.connect(process.env.MONGO_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  mongoose.connection.on('connected', () => {
    console.log('MongoDB 连接成功')
  })

  mongoose.connection.on('error', () => {
    console.log('Error')
  })
}

module.exports = { connectMongoDB }
