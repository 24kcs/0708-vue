// 引入Vue
import Vue from 'vue'
// 引入组件
import App from './App.vue'
// 事件总线----把绑定事件和解绑事件和分发事件的相关的方法都放在一个对象上,所有的组件都可以直接访问这个对象上的这些事件的方法了
Vue.prototype.$bus = new Vue()
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
