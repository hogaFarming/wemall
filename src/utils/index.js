/**
 * 页面跳转
 * @param path
 * @param search
 * @param options
 */
export function navigateTo (path, search, options) {
  let strSearch = ''
  if (search) {
    strSearch = '?'
    for (var key in search) {
      strSearch += key + '=' + search[key] + '&'
    }
    strSearch = strSearch.slice(0, -1)
  }
  let url = `/static/views/${path}.html${strSearch}`
  location.href = encodeURI(url)
}
