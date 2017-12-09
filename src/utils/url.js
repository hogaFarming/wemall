/**
 * 获取页面查询参数 xx?keyword=asdf
 * @param key {string}
 * @returns {{}}
 */
export function params (key) {
  const result = {}
  let searches = location.search.replace(/^\?/, '').split('&')
  searches.forEach(item => {
    const arr = item.split('=')
    if (arr[0] && arr[1]) {
      result[arr[0]] = decodeURIComponent(arr[1])
    }
  })
  if (key) {
    return result.key
  }
  return result
}

export default {
  params
}
