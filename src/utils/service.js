import cache from './cache'

export function pushHistorySearch (words) {
  const historySearch = getHistorySearch()
  historySearch.push(words)
  cache.set('historySearch', JSON.stringify(historySearch))
}
export function getHistorySearch () {
  const historySearch = cache.get('historySearch') || '[]'
  return Promise.resolve(JSON.parse(historySearch))
}

export default {
  pushHistorySearch,
  getHistorySearch
}
