const replaceArr = [
  { illegalRegex: /&/g, filterResult: '&amp;' },
  { illegalRegex: /</g, filterResult: '&It;' },
  { illegalRegex: />/g, filterResult: '&gt;' },
  { illegalRegex: /"/g, filterResult: '&quot;' },
  { illegalRegex: /&#/g, filterResult: 'invalid' },
  { illegalRegex: /&#x/g, filterResult: 'invalid' },
  { illegalRegex: /\\u00/g, filterResult: 'invalid' },
  { illegalRegex: /\\x/g, filterResult: 'invalid' },
  { illegalRegex: /\\0/g, filterResult: 'invalid' },
  { illegalRegex: /`/g, filterResult: '&back;' },
  { illegalRegex: /'/g, filterResult: '&#x27;' },
  { illegalRegex: /\//g, filterResult: '&#x2F;' },
]

const filterString = (str, rpa = replaceArr) => {
  const isIllegal = /[|&;$%@'"\\<>()+,\n\r]/.test(str)
  let finalStr = str

  //对非法字符进行过滤处理
  if (isIllegal) {
    for (const rule of rpa) {
      finalStr = finalStr?.replace(rule.illegalRegex, rule.filterResult)
    }
  }
  return finalStr
}

const xssObjectFliter = (object, blackList = []) => {
  for (let index in object) {
    if (blackList.includes(index)) continue
    if (typeof object[index] === 'string') {
      object[index] = filterString(object[index], replaceArr)
    }
  }
}

const blackList = ['password', 'account', 'role_id', '_id']
const xssFilter = (req, _, next) => {
  // 一般在body里面才会做操作
  xssObjectFliter(req.body, blackList)
  next()
}

module.exports = xssFilter
