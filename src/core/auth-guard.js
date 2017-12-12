import request from 'core/http'

const api_url = window.app.config.api.url

const AUTH_TYPE = {
  wechat: 'wechatOauth',
  login: 'login'
}
const ERR_CODE = {
  need_bind: 'need_bind',
  need_login: 'need_login',
  need_auth: 'need_auth',
  recheck: 'recheck',
  network: 'network'
}

const _storage = {
  set (key, val) {
    localStorage.setItem(key, val)
  },
  get (key) {
    return localStorage.getItem(key)
  },
  remove (key) {
    if (Array.isArray(key)) {
      for (let k in key) {
        localStorage.removeItem(k)
      }
    } else {
      localStorage.removeItem(key)
    }
  }
}

export default {
  /**
   * 检查认证状态
   * @param {object} authType
   * @param {function} handler (errcode) => { ... }
   */
  check (authType, handler) {
    const recheck = this.check.bind(this, authType, handler)

    // 先检查api签名
    if (!this.getToken()) {
      this.updateToken().then(recheck, function (err) {
        handler(ERR_CODE.network)
      })
      return
    }

    // 开发者调试
    if (this._urlParams('usertest')) return handler()

    const isLogin = this._getIsLogin()
    if (!isLogin) {
      if (authType === AUTH_TYPE.login) {
        handler(ERR_CODE.need_login)
      } else if (authType === AUTH_TYPE.wechat) {
        if (this._getIsAuth()) return handler()

        _storage.set('isLogin', 2)
        handler(ERR_CODE.need_auth)
        // const callbackUrl = location.origin + options.callbackUrl
        // let url = api_url + options.redirectUrl +
        //   '?callback=' + (encodeURIComponent(callbackUrl)) +
        //   '&token=' + this.getToken() +
        //   '&type=' + 'mp'
        // const usertest = this._urlParams('usertest')
        // if (usertest) {
        //   url += '&usertest=' + usertest
        // }
        // _storage.set('isLogin', 2)
        // window.location.href = url
      }
    } else if (isLogin === 2) {
      this._judgeLogin(function (code) {
        if (code === ERR_CODE.recheck) {
          recheck()
        } else {
          handler(code)
        }
      }, function (err) {
        handler(ERR_CODE.network)
      })
    } else {
      handler()
    }
  },
  /**
   * 更新apitoken
   */
  updateToken () {
    return request('/api/init').then(function (res) {
      if (res.result) {
        _storage.set('token', res.token)
      } else {
        throw new Error('获取token失败')
      }
    })
  },
  getToken () {
    return _storage.get('token')
  },
  _goRedirect (url, callbackUrl) {

  },
  // 0未登录，1已登录，2微信认证中
  _getIsLogin () {
    const str = _storage.get('isLogin')
    if (!str) return 0
    return +str
  },
  _getIsAuth () {
    const str = _storage.get('isAuth')
    if (!str) return 0
    return +str
  },
  /**
   * 获取登录状态
   */
  _judgeLogin () {
    return request('/api/judge/logins').then(function (res) {
      if (res.data.is_auth === 1 && res.data.is_user === 0) { // 授权成功，未登录 => 跳转到绑定
        _storage.set('isLogin', 0)
        _storage.set('isAuth', 1)

        return ERR_CODE.need_bind
      } else if (res.data.is_auth === 0) {  // 授权失败 => 重新发起check
        _storage.set('isAuth', 0)
        _storage.set('isLogin', 0)

        return ERR_CODE.recheck
      } else if (res.data.is_auth === 1 && res.data.is_user === 1) { // 授权成功，已登录
        _storage.set('isAuth', 1)
        _storage.set('isLogin', 1)

        return undefined
      }
    })
  },
  _urlParams (key) {
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
}
