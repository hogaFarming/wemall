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

Vue.use(require('vue-wechat-title'))

const app = window.app = { router }
app.config = config

Vue.use(filters)
Vue.use(globalMixin)

Vue.prototype.$cache = app.cache = cache
Vue.prototype.$utils = app.utils = utils
Vue.prototype.$service = app.service = service
Vue.prototype.$auth = app.auth = auth
Vue.prototype.$http = app.http = http

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
  if (!to.matched.some(record => record.meta.requireAuth)) return next()

  if (utils.isWeChat()) {
    if (cache.get('isAuth') === '1' && cache.get('isLogin') === '1') {
      next()
      return
    }

    auth.check({
      type: 'wechatOauth',              // wechatOauth, login
      redirectUrl: '/api/wechat/auth',  // 验证不通过跳转的地址
      url: to.path,                     // 需要验证的地址
      callbackUrl: to.fullPath          // 返回的地址
    }, next)
  } else {
    auth.check({
      type: 'login',                    // wechatOauth, login
      redirectUrl: '/login',            // 验证不通过跳转的地址
      url: to.path,                     // 需要验证的地址
      callbackUrl: to.fullPath          // 返回的地址
    }, next)
  }
})

export default app
