// 引入组件
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
// 引入组件
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
import MessageDetail from '../pages/MessageDetail.vue'
export default [
  // {path:'地址',component:组件名字}
  {
    path: '/about',
    component: About
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home/news',
        component: News
      }, {
        path: '/home/message',
        component: Message,
        children:[
          {
            path:'/home/message/detail/:id', // 使用/:id 来占位,用来传递参数 
            component:MessageDetail,
            props: (route) => ({ id: route.params.id })
          }
        ]
      },
      {
        path: '/home',
        redirect: '/home/news'
      }
    ]
  },
  {
    path: '/',
    redirect: '/about' // 重定向
  },
]