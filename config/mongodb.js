const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log('Connected to mongoDB')
})

mongoose.connection.on('error', () => {
  console.log('Error')
})
