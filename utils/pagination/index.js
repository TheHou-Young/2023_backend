const DEFAULT = {
  page: 1,
  size: 10,
}

// 分页场景
const pagination = async (query, options) => {
  const { page = DEFAULT.page, size = DEFAULT.size } = options
  const count = await query?.countDocuments?.()
  const data = await query?.skip?.(page - 1)?.limit?.(size)
  return {
    count,
    list: data,
  }
}

module.exports = pagination
