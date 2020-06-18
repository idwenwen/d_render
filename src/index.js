/**
 * For checking current content
 */
import Vue from 'vue'
window.Vue = Vue

import store from './store'
import router from './router'
import './mixin/defaultMixin'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import location from 'element-ui/lib/locale/lang/zh-CN'

import App from './App.vue'

Vue.use(ElementUI, { location })
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})