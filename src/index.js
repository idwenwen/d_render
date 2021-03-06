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

import 'babel-polyfill'

// import App from './App.vue'
// import main from './main.vue'
// import box from './checkbox.vue'
// import Form from './Form.vue'
// import cTable from './Table.vue'
// import groups from './Group.vue'
// import Charts from './Chart.vue'
// import Async from './Async.vue'
// import ColTable from './ColTable.vue'
// import FormTest from './FormTest.vue'
// import Transform from './Transform.vue'
// import TreeSelect from './TreeSelect.vue'
// import Sorting from './sorting.vue'
import Pearson from './Pearson.vue'

Vue.use(ElementUI, { location })
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(Pearson)
})