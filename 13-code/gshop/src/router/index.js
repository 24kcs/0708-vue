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
const router= new VueRouter({
  mode: 'history',
  routes
})

// 全局前置路由守卫
// const paths=['/goone','/gotwo']
// router.beforeEach((to, from, next) => {
 
//   // console.log(to)   to: 要去哪里---->目标
//   // console.log(from) from:从哪里来---->路由离开的对象(对应的路径)

//   // 判断
//   if(paths.indexOf(to.path)!==-1){
//     // 需求1:如果你要去goone或者gotwo中任何一个路径,直接跳转到登录
//     // router.push('/login')
//     // 去登录
//     if(!store.state.user.user._id){
//       router.push('/login')
//     }
//   }
//   // 放行
//   next()
// })
 export default router 
