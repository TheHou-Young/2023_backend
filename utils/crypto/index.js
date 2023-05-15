const CryptoJS = require('crypto-js')
const JSEncrypt = require('jsencrypt')

const JSEncryptInstance = new JSEncrypt()

// RSA解密
const decryptLongByRSA = (cipherContent) => {
  const newValue = typeof cipherContent === 'string' ? cipherContent : cipherContent.toString()
  JSEncryptInstance.setPrivateKey(process.env.RSA_PRIVATE_KEY)
  return JSEncryptInstance.decryptLong(newValue) // 注意：加密类型为string
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
  decryptLongByRSA,
  encryptByAES,
  decryptByAES,
}
