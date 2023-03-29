var express = require('express')
var router = express.Router()

function getUserFromDb() {
  // throw new Error('err')
  return new Promise(() => {
    throw new Error('this is an error')
  })
  // return Promise.reject('this is an error')
}

async function ace() {
  await getUserFromDb()
}

/* GET users listing. */
router.get('/user-test', async (req, res, next) => {
  await ace()
  res.json({ a: 1 }).end()
})

module.exports = router
