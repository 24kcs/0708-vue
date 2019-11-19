// 引入Vue
import Vue from 'vue'
// 引入组件
import App from './App.vue'
// 引入Vue-Resource
import VueResource from 'vue-resource'
// 声明使用插件
Vue.use(VueResource)
// 设置是否显示提示信息
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
