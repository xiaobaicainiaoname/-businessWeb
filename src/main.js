// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
// import service from './service.js'

Vue.use(ElementUI)
// Vue.use(service)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // ui
  render: h => h(App)// createElement(App)
})

axios.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    console.log(response.data)

    return response.data
  },
  error => {
    console.log(error + ' ' + error.config.url) // for debug
    console.log(error)
    return error
  }
)
