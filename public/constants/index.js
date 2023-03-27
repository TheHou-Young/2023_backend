const BACKEND_CODE = {
  OK: 200,
  CODE_ERROR: 400,
  BUSINESS_ERROR: 10001,
}

const MESSAGE = {
  [BACKEND_CODE.OK]: '成功',
}

module.exports = {
  BACKEND_CODE,
  MESSAGE,
}
