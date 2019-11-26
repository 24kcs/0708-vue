import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// 这里有问题
// new Vue({
//   render: h => h(App),
// }).$mount('#app')

new Vue({
  // 根据选择器找对应的容器,进行编译
  el:'#app',
  // 注册组件
  components:{
    App
  },
  // 模版
  template:'<App/>'
})

