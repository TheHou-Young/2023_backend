const DEFAULT = {
  page: 1,
  size: 10,
}
/**
 * @params { model, matchPip, listPip, options = DEFAULT }
 * @model 用于聚合查询的模型
 * @matchPip 过滤方法
 * @listPip 聚合方法
 * @options 分页参数
 */
// 分页场景
const pagination = async ({ model, matchPip, listPip, options = DEFAULT }) => {
  const { page = DEFAULT.page, size = DEFAULT.size } = options
  const [data] = await model?.aggregate?.([
    {
      $match: matchPip,
    },
    {
      $facet: {
        list: [...listPip, { $skip: (page - DEFAULT.page) * size }, { $limit: size }],
        count: [
          {
            $count: 'count',
          },
        ],
      },
    },
    {
      $unwind: '$count',
    },
    {
      $project: {
        count: '$count.count',
        list: '$list',
      },
    },
  ])
  const { list = [], count = 0 } = data ?? {}
  return { list, count }
}

module.exports = pagination
