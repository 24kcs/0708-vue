// 引入组件,并注册路由组件
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import News from '../pages/News.vue'
import Messages from '../pages/Messages.vue'
import MessageDetail from '../pages/MessageDetai.vue'
export default [
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
      },
      {
        path: '/home/messages',
        component: Messages,
        children: [
          {
            path: '/home/messages/detail/:id',
            component: MessageDetail,
           
          }
          // {
          //   path: '/home/messages/detail',
          //   component: MessageDetail,
          //   props: (route) => ({ query: route.query.id }) 
          // }
         
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
    redirect: '/about'
  }
]