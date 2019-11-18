// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'
// 引入
import VueResource from 'vue-resource'
// 声明使用
Vue.use(VueResource)
// 设置控制提示信息
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  
})
