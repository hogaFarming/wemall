import Vue from 'vue'
import App from './App'
import app from 'core'
import 'components'
import 'parts'
import 'styles/main.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
const root = new Vue({
  el: '#app',
  router: app.router,
  template: '<App/>',
  components: { App }
})

window.app.root = root
