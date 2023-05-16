const cryptoInstance = require('../../utils/crypto')
const lodash = require('lodash')

const decryptRequest = (req, _, next) => {
  if (!lodash.isEmpty(req.query)) {
    const AESKey = cryptoInstance.decryptByRSA(req.query.AESCryptoKey, process.env.RSA_PRIVATE_KEY)
    // req.query = cryptoInstance.decryptByAES(req.query.params)
    req.query = cryptoInstance.decryptByAES(req.query.params, AESKey)
    _.AESKey = AESKey
  }
  next()
}

module.exports = {
  decryptRequest,
}
