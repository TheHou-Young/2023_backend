const period = () => {
  const time = new Date()
  time.setHours(0, 0, 0, 0)
  const left = time.getTime()
  const right = left + 1000 * 60 * 60 * 24
  return [left, right]
}

module.exports = period
