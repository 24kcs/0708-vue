// 引入axios
import axios from 'axios'
// 引入qs---将对象数据转UrlEncoding
import qs from 'qs'
// 引入store
import store from '../store'
import { Toast } from 'mint-ui'
// 引入router
import router from '../router'
// 添加请求拦截器
axios.interceptors.request.use(config => {
  const { method, data } = config
  // 判断,method中是不是POST请求,并且data应该是一个对象----->urlEncoding形式
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    config.data = qs.stringify(data)
  }
  // 判断当前的接口是否需要携带token
  if (config.headers.needToken) {
    // 此时需要携带token,取出token
    const token = store.state.user.token
    // 判断token是否存在
    if (!token) {
      const error = new Error('没有token,请重新登录')
      // 设置错误码
      error.status = 401
      throw error // 抛出一个错误信息
    } else {
      // 有token,把token添加到请求头中
      config.headers.authorization = token
    }
  }
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  // 判断当前的错误信息是请求的还是响应
  if (!error.response) {
    // 请求的错误
    if (error.status === 401) {
      // 跳转到/login登录界面---先判断是不是login界面---currentRoute当前的路由组件
      if (router.currentRoute.path !== '/login') {
        // 提示错误信息
        Toast(error.message)
        router.replace('/login')
      }

    }
  } else {
    // 响应的错误
    // 获取响应的时候的错误码
    const status = error.response.status
    if (status === 401) {
      // token过期了
      if (router.currentRoute.path !== '/login') {
        // 提示
        Toast(error.response.data.message)
        // 重置token
        store.dispatch('resetLogin')
        // 跳转到登录界面
        router.replace('/login')
      }

    } else if (status === 404) {
      Toast('没有资源')
    } else {
      Toast('请求错误:' + error.message)
    }
  }

  // 中断当前的错误消息,继续的响应
  return new Promise(() => { })
})
// 暴露axios
export default axios
