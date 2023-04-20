class Result {
  constructor({ code, msg, data }) {
    this.code = code
    this.msg = msg
    this.data = data ?? {}
  }
}

class OK extends Result {
  constructor({ code, msg, data }) {
    super({ code, msg, data })
    this.code = 200
  }
}

class Fail extends Result {
  constructor({ code, msg, data }) {
    super({ code, msg, data })
    this.code = code ?? 400
  }
}

module.exports = {
  OK,
  Fail,
}
