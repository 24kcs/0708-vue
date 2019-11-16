// 引入Vue
import Vue from 'vue'
// 引入父级组件
import App from './App.vue'
// 设置控制台中是否有警告提示
Vue.config.productionTip = false
// 实例化对象
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
