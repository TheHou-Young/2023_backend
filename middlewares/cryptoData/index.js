const cryptoInstance = require('../../utils/crypto')
const lodash = require('lodash')

const decryptRequest = (req, _, next) => {
  const keys = !lodash.isEmpty(req.query) ? 'query' : 'body'
  const dataKeys = !lodash.isEmpty(req.query) ? 'params' : 'data'
  if (!lodash.isEmpty(req[keys])) {
    const AESKey = cryptoInstance.decryptByRSA(req?.[keys].AESCryptoKey, process.env.RSA_PRIVATE_KEY)
    req[keys] = cryptoInstance.decryptByAES(req[keys][dataKeys], AESKey)
    _.AESKey = AESKey
  }
  next()
}

module.exports = {
  decryptRequest,
}
