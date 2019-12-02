// 引入vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
import Test1 from '../pages/Test1.vue'
import Test2 from '../pages/Test2.vue'
Vue.use(VueRouter)
export default new VueRouter({
  mode:'history',
  routes:[
    {
      path:'/test1',
      component:Test1
    },
    {
      path:'/test2',
      component:Test2
    }
  ]
})