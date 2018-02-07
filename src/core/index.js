import Vue from 'vue'
import 'mint-ui/lib/style.css'
import { Popup, Picker, Cell, CellSwipe, Lazyload, Navbar, TabItem, Field, Switch, MessageBox, InfiniteScroll, Indicator, Toast } from 'mint-ui'
import './vendors'
import router from './router'
import service from './service'
import auth from './authorization'
import http from './http'
import globalMixin from './mixins'
import filters from './filters'
import cache from 'utils/cache'
import utils from 'utils/common'
import config from 'core/config'
import wechat from 'core/wechat'

Vue.use(require('vue-wechat-title'))

const app = window.app = { router }
app.config = config

window.config = config
window.tools = {
  cache: {
    get (key) {
      if (key === 'Authorization') return cache.get('token')
      return cache.get(key)
    }
  },
  ajax ({ url, ajaxData, successFun, errorFun, type }) {
    http({
      url: url,
      data: ajaxData,
      method: type
    }).then(successFun, errorFun)
  },
  alert: {
    error: Toast
  }
}

Vue.use(filters)
Vue.use(globalMixin)

Vue.prototype.$cache = app.cache = cache
Vue.prototype.$utils = app.utils = utils
Vue.prototype.$service = app.service = service
Vue.prototype.$auth = app.auth = auth
Vue.prototype.$http = app.http = http
Vue.prototype.$wechat = app.wechat = wechat

Vue.prototype.$loading = app.loading = (text) => {
  if (text === false) {
    Indicator.close()
  } else {
    Indicator.open(text)
  }
}
Vue.prototype.$hideLoading = app.hideLoading = () => {
  Indicator.close()
}
Vue.prototype.$toast = app.toast = Toast
Vue.prototype.$messagebox = app.messagebox = MessageBox

Vue.use(Lazyload)
Vue.use(InfiniteScroll)
Vue.component(Popup.name, Popup)
Vue.component(Cell.name, Cell)
Vue.component(CellSwipe.name, CellSwipe)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Field.name, Field)
Vue.component(Switch.name, Switch)
Vue.component(MessageBox.name, MessageBox)
Vue.component(Picker.name, Picker)

/**
 * 检查权限
 */
router.beforeEach((to, from, next) => {
  // return next()
  // if (!to.matched.some(record => record.meta.requireAuth)) return next()
  let nextRoute
  if (from && from.query && from.query.usertest && !to.query.usertest) {
    nextRoute = {
      path: to.path,
      params: to.params,
      query: to.query || {}
    }
    nextRoute.query.usertest = from.query.usertest
  }
  console.log(JSON.stringify(nextRoute))
  if (app.isLogin) {
    next(nextRoute)
  } else {
    auth.init(to.fullPath).then((willRedirectWxAuth) => {
      if (!willRedirectWxAuth) {
        app.isLogin = true
        next(nextRoute)
      }
    }, err => {
      app.toast('登录失败，请刷新页面重试')
    })
  }
})

export default app
