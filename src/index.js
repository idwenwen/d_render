/**
 * For checking current content
 */
import Vue from 'vue'
window.Vue = Vue

import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})