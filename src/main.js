// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入resource
import Http from 'vue-resource' 
// 全局应用
import store from '@/store'

Vue.config.productionTip = false

// 全局使用
Vue.use(Http)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
