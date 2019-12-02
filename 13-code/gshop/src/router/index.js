// 引入Vue
import Vue from 'vue'
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes'
import store from '../store'
// 声明使用插件
Vue.use(VueRouter)
// 暴露路由器
const router = new VueRouter({
  mode: 'history',
  routes
})
// const paths=['/goone','/gotwo']
// router.beforeEach((to, from, next) => {
//   // to--->目标路由,要去哪里
//   console.log(to)
//   console.log(from)

//   // 如果去goone或者gotwo则去登录界面
//   // if(paths.indexOf(to.path)!==-1){
//   //   next('/login')
//   // }
//   // 没有登录则去登录界面,否则放行
//    if(paths.indexOf(to.path)!==-1){
//     if(!store.state.user.user._id){
//       next('/login')
//     }
   
//   }
//   // 放行
//   next()
// })

export default router 
