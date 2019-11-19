// 引入Vue
import Vue from 'vue'
// 引入router
import VueRouter from 'vue-router'

import routes from './routes.js'
// 声明使用插件
Vue.use(VueRouter)
// 暴露路由器对象
export default new VueRouter({
  mode:'history',
  routes
})

