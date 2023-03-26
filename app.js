const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const { loadRouter } = require('./routes/index')

const dotenv = require('dotenv')

const app = express()

/**
 * 配置不同环境
 * env负责书写默认环境，其他的不同的环境如果有冲突会将env公共配置覆盖
 */
dotenv.config({
  path: path.resolve(
    __dirname,
    `./config/environments/.env.${process.env.NODE_ENV}`
  ),
})

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

mongodb连接
const { MONGO_URL } = require("./config/db");
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoDB");
});

mongoose.connection.on("error", () => {
  console.log("Error");
});

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

loadRouter(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})
console.log(process.env.MONGO)
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
