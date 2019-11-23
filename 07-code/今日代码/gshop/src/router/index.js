// 引入路由
import VueRouter from 'vue-router'
// 引入Vue
import Vue from 'vue'
// 引入routes
import routes from './routes'
// 声明使用路由
Vue.use(VueRouter)
// 暴露路由器对象
export default new VueRouter({
  mode: 'history',
  routes
})
