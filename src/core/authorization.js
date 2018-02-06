import cache from 'utils/cache'
import request from 'core/http'
import log from 'utils/log'
import utils from 'utils/common'

export function init (callbackUrl = '/') {
  return Promise.resolve()
    .then(() => {
      const token = getToken()
      if (!token) {
        return updateToken()
      }
    })
    .then(judgeLogin)
    .then(isAuth => {
      debugger
      if (!isAuth) {
        redirectToWxAuth(callbackUrl)
        return true
      }
    })
}

export function getToken () {
  return cache.get('token')
}

export function judgeLogin () {
  log.debug('检查是否登录')
  if (utils.url.params('usertest')) return 1
  return request('/api/judge/logins').then(res => res.data.is_auth)
}

export function redirectToWxAuth (callbackUrl) {
  const callback = location.origin + callbackUrl
  let url = app.config.api.url + '/api/wechat/auth' +
    '?callback=' + (encodeURIComponent(callback)) +
    '&token=' + getToken() +
    '&type=' + 'mp'
  const share_sign = utils.url.params('share_sign')
  if (share_sign) {
    url += '&share_sign=' + share_sign
  }
  window.location.href = url
}

export function updateToken () {
  return request.get('/api/init').then(result => {
    if (result.result) {
      cache.set('token', result.token)
    } else {
      throw new Error('获取token失败')
    }
  })
}

export default {
  getToken,
  updateToken,
  init,
  redirectToWxAuth
}
