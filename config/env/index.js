const dotenv = require('dotenv')
const path = require('path')
const rootPath = './.env'
/**
 * 配置不同环境
 * env负责书写默认环境，其他的不同的环境如果有冲突会将env公共配置覆盖
 */
const loadEnv = () => {
  dotenv.config({
    path: path.resolve(__dirname, `${rootPath}.${process.env.NODE_ENV}`),
  })
  dotenv.config({
    path: path.resolve(__dirname, rootPath),
  })
}

module.exports = { loadEnv }
