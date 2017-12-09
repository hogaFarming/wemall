// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'mint-ui/lib/style.css'
import { Popup, Cell, Lazyload, Navbar, TabItem, Field, Switch, MessageBox, InfiniteScroll, Indicator, Toast } from 'mint-ui'
import App from './App'
import router from './router'
// import { navigateTo, getParams } from './utils'
import cache from './utils/cache'
import auth from './utils/auth'
import request from './utils/request'
import tools from './utils/tools'
import service from './utils/service'
import './filters'
import './components'
import './parts'
import './styles/main.scss'

const app = window.app = {}

Vue.prototype.$cache = app.cache = cache
Vue.prototype.$auth = app.auth = auth
Vue.prototype.$tools = app.tools = tools
Vue.prototype.$service = app.service = service
Vue.prototype.$http = app.request = request
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
Vue.prototype.$messagebox = MessageBox

Vue.config.productionTip = false

Vue.use(Lazyload)
Vue.component(InfiniteScroll)
Vue.component(Popup.name, Popup)
Vue.component(Cell.name, Cell)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Field.name, Field)
Vue.component(Switch.name, Switch)
Vue.component(MessageBox.name, MessageBox)

/* 初次打开,检查权限 */
router.beforeEach((to, from, next) => {
  // return next()
  if (!to.matched.some(record => record.meta.requireAuth)) return next()

  if (tools.isWeChat()) {
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
