// 引入Vue
import Vue from 'vue'
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入组件
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
// 声明使用VueRouter
Vue.use(VueRouter)
export default new VueRouter({
  routes:[
    // {path:'地址',component:组件名字}
    {
      path:'/about',
      component:About
    },
    {
      path:'/home',
      component:Home
    }
  ]

})