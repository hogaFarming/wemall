import cache from 'utils/cache'
import request from 'core/http'
import log from 'utils/log'
import utils from 'utils/common'

export function getToken () {
  return cache.get('token')
}

/**
 * 检查登录状态
 * @param option
 * @param next
 *  router.beforeEach((to, from, next) = > {
        LoginStatus.check({
            type: 'wechatOauth',
            redirectUrl: '/api/wechat/auth'
        }, next);
    })
 * @returns {Promise<any>}
 */
export function check (option = {}, next) {
  const _check = check.bind(null, option, next)
  // 没有token
  if (!getToken()) {
    updateToken().then(_check)
    return
  }

  const data = {
    type: option.type || 'wechatOauth',  // wechatOauth:微信授权; login:普通登录
    isRedirect: option.isRedirect || 1,    // 1 or 0
    redirectUrl: option.redirectUrl || '/login',
    url: option.url || location.pathname,  // 需要验证的地址
    callbackUrl: option.callbackUrl || location.pathname + location.search // 返回的地址
  }

  // 开发者
  if (utils.url.params('usertest')) return next()

  const loginStatus = cache.get('isLogin')
  if (!loginStatus || loginStatus === '0') {
    if (data.isRedirect === 1 && data.type === 'login') {
      next({
        path: data.redirectUrl,
        query: { callback: data.callbackUrl }
      })
    } else if (data.type === 'wechatOauth') {
      const isAuth = cache.get('isAuth')
      if (isAuth === '1') return next()
      const callback = location.origin + data.callbackUrl
      let url = app.config.api.url + data.redirectUrl +
        '?callback=' + (encodeURIComponent(callback)) +
        '&token=' + getToken() +
        '&type=' + 'mp'
      if (utils.url.params('usertest')) {
        url += '&usertest=' + utils.url.params('usertest')
      }
      cache.set('isLogin', 2)
      window.location.href = url
    }
  } else if (loginStatus === '2') {
    isLogin('/api/judge/logins', option, next)
  } else {
    typeof next === 'function' && next()
  }
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

/* 获取是否登录 */
function isLogin (url, option, next) {
  log.debug('获取是否登录')
  request(url).then(res => {
    if (res.data.is_auth === 1 && res.data.is_user === 0) { // 授权成功，未登录
      cache.set('isLogin', 0)
      cache.set('isAuth', 1)

      check({
        type: 'login',
        redirectUrl: '/binding',
        url: option.url,
        callbackUrl: option.callbackUrl
      }, next)
    } else if (res.data.is_auth === 0) {  // 授权失败
      cache.set('isAuth', 0)
      cache.set('isLogin', 0)

      // 重新check
      check(option, next)
    } else if (res.data.is_auth === 1 && res.data.is_user === 1) { // 授权成功，已登录
      cache.set('isAuth', 1)
      cache.set('isLogin', 1)

      check({
        type: 'login',
        redirectUrl: '/login',
        url: option.url,
        callbackUrl: option.callbackUrl
      }, next)
    }
  }, err => {
    log.error('登录失败!')
    // app.alert.error('登录失败!')
    cache.set('isLogin', 0)
    cache.set('isAuth', 0)
    // 重新check
    check(option, next)
  })
}

export default {
  getToken,
  updateToken,
  check
}
