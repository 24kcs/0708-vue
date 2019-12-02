
import Vue from 'vue'
import App from './App'
// 引入路由器并注册
import router from './router'
// 引入store
import store from './store'
// 引入Header组件
import Header from './components/Header/Header.vue'
// 引入Star
import Star from './components/Star/Star.vue'
// 引入表单验证的插件
import './vee-validate'
import { Button } from 'mint-ui';
// 执行一次mock-server
import './mock/mock-server.js'
// 引入CartControl
import CartControl from './components/CartControl/CartControl.vue'

import './filter'

// 引入图片懒加载的插件
import VueLazyload from 'vue-lazyload'
// 引入图片
import loading from './common/images/loading.gif'
// 声明使用懒加载的插件
Vue.use(VueLazyload, {
  loading
})


Vue.prototype.$bus=new Vue()
// 注册成全局组件(在任何组件中可以直接使用,可以叫公共组件)
Vue.component(Header.name, Header)
Vue.component(Star.name, Star)
Vue.component(Button.name, Button);
Vue.component(CartControl.name, CartControl);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
