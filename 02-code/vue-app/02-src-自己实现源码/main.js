// 引入Vue
import Vue from 'vue'
// 引入组件
import App from './App.vue'
// 可写可不写
// 设置当前提示信息在浏览器的控制台中是否显示
Vue.config.productionTip = false
// 创建Vue的实例对象
/* eslint-disable no-new */
new Vue({
  // 找容器对象
  el: '#app',
  // 注册组件
  components: {
    App
  },
  // 使用模版
  template: '<App/>'
})
