// 引入Vue
import Vue from 'vue'
// 引入VueRouter
import VueRouter from 'vue-router'
import routes from './routes.js'
// 声明使用VueRouter
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  routes

})