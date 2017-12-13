import cache from '../utils/cache'

export function pushHistorySearch (words) {
  if (!words || typeof words !== 'string') return
  let historySearch = getHistorySearch()
  console.log(historySearch.indexOf(words))
  if (historySearch.indexOf(words) === -1) {
    historySearch.push(words)
  } else {
    historySearch = historySearch.filter(item => item !== words)
    historySearch.push(words)
  }
  cache.set('historySearch', JSON.stringify(historySearch.slice(0, 10)))
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
