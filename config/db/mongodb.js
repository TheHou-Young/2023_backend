const _ = require('mongoose')

const connectMongoose = (mongoose = _) => {
  mongoose.connect(process.env.MONGO_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  mongoose.connection.on('connected', () => {
    console.log('Connected to mongoDB')
  })

  mongoose.connection.on('error', () => {
    console.log('Error')
  })
}

module.exports = { connectMongoose }
