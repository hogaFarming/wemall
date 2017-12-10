import cache from '../utils/cache'

export function pushHistorySearch (words) {
  const historySearch = getHistorySearch()
  historySearch.push(words)
  cache.set('historySearch', JSON.stringify(historySearch))
}
export function queryHistorySearch () {
  return Promise.resolve(getHistorySearch())
}
function getHistorySearch () {
  return JSON.parse(cache.get('historySearch') || '[]')
}

export default {
  pushHistorySearch,
  queryHistorySearch
}
