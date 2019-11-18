// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 在浏览器的控制台中是否需要提示信息
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  // 容器---index.html
  el: '#app',
  // 注册组件
  components: { App },
  // 模版---使用的是App组件的这个模版
  template: '<App/>'
})
