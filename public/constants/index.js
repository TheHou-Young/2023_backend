const BACKEND_CODE = {
  OK: 200,
  CODE_ERROR: 400,
  BUSINESS_ERROR: 10001,
}

const MESSAGE = {
  [BACKEND_CODE.OK]: '成功',
}

const REDIS_DB = {
  login: 0,
  permission: 1,
}

module.exports = {
  BACKEND_CODE,
  MESSAGE,
  REDIS_DB,
}
