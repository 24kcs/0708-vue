// 引入路由组件
const MSite=()=>import('../pages/MSite/MSite.vue')
const Search=()=>import('../pages/Search/Search.vue')
const Order=()=>import('../pages/Order/Order.vue')
const Profile=()=>import('../pages/Profile/Profile.vue')
// import MSite from '../pages/MSite/MSite.vue'
// import Search from '../pages/Search/Search.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
// 引入登录组件
import Login from '../pages/Login/Login.vue'

// 引入Shop
import Shop from '../pages/Shop/Shop.vue'
// 引入Goods
import Goods from '../pages/Shop/Goods/Goods.vue'
// 引入Ratings
import Ratings from '../pages/Shop/Ratings/Ratings.vue'
// 引入Info
import Info from '../pages/Shop/Info/Info.vue'









// 引入goOne 和goTwo
import goOne from '../pages/Test/goOne.vue'
import goTwo from '../pages/Test/goTwo.vue'
// 引入showtest
import ShowTest from '../pages/Test/ShowTest.vue'
import B1 from '../pages/Test/B1.vue'
import B2 from '../pages/Test/B2.vue'
// 并暴露路由的数组配置
export default [
  {
    path: '/msite',
    component: MSite,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        component: Goods
      },
      {
        path: '/shop/ratings',
        component: Ratings
      },
      {
        path: '/shop/info',
        component: Info
      },
      {
        path: '/shop',
        redirect: '/shop/goods'
      }
    ]
  },
  {
    path:'/goone',
    component:goOne
  },
  {
    path:'/gotwo',
    component:goTwo
  },
  {
    path:'/showtest',
    component:ShowTest,
    children:[
      {
        path:'/showtest/b1',
        component:B1
      },
      {
        path:'/showtest/b2',
        component:B2
      },
      {
        path: '/showtest',
        redirect: '/showtest/b1'
      }
    ]
  },
  {
    path: '/',
    redirect: '/msite'
  }

]
