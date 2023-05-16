const CryptoJS = require('crypto-js')
const NodeRSA = require('node-rsa')

// RSA解密
const decryptByRSA = (cipherContent) => {
  const newValue = typeof cipherContent === 'string' ? cipherContent : cipherContent.toString()
  const privateKey = new NodeRSA(process.env.RSA_PRIVATE_KEY)
  privateKey.setOptions({ encryptionScheme: 'pkcs1' })
  return privateKey.decrypt(newValue, 'utf8')
}

// AES加密
const encryptByAES = (cipherContent, key) => {
  const aesKey = CryptoJS.enc.Utf8.parse(key)
  const newValue = typeof cipherContent === 'string' ? cipherContent : cipherContent.toString()
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(newValue), aesKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}

// AES解密
const decryptByAES = (plainContent, key) => {
  const aesKey = CryptoJS.enc.Utf8.parse(key)
  const decrypt = CryptoJS.AES.decrypt(plainContent, aesKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  const decString = CryptoJS.enc.Utf8.stringify(decrypt).toString()
  return decString instanceof Object ? decString : JSON.parse(decString)
}

module.exports = {
  decryptByRSA,
  encryptByAES,
  decryptByAES,
}
