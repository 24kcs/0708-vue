// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 设置浏览器的控制台中是否有警告提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 定义组件
  components: { App },
  // 设置模版
  template: '<App/>'
})
