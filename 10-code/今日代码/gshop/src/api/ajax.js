// 引入axios
import axios from 'axios'
// 引入qs---将对象数据转UrlEncoding
import qs from 'qs'
// 引入store
import store from '../store'
// 引入router
import router from '../router'
// 引入Toast
import { Toast } from 'mint-ui'
// 添加请求拦截器
axios.interceptors.request.use(config => {
  const { method, data } = config
  // 判断,method中是不是POST请求,并且data应该是一个对象----->urlEncoding形式
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    config.data = qs.stringify(data)
  }
  // 判断当前接口是否需要携带token
  if (config.headers.needToken) {
    // 如果需要携带token,则取出token
    const token = store.state.token
    // 判断token是否存在
    if (!token) {
      const error = new Error('没有token,请重新登录')
      error.status = 401 // 错误码
      throw error // 抛出错误
    } else {
      // 此时有token,把token添加到请求头的authrization中
      config.headers.authorization = token
      
    }
  }

  return config
})
// 添加响应拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  // 请求出错没有错误
  if (!error.response) {
    // 请求的错误中没有token
    if (error.status === 401) {
      // 判断当前的路径是不是login,如果不是则跳转到login
      if (router.currentRoute.path!== '/login') {
        // 显示错误消息并跳转
        Toast(error.message)
        // 跳转
        router.replace('/login')
      }
    }
  } else {
    // 响应的时候token过期了,或者没有资源的时候就会报错
    const status = error.response.status
    if (status === 401) {
      console.log('响应的时候出了问题')
      // 提示过期了
      Toast(error.response.data.message)
      // 重置用户
      store.dispatch('resetUser')
      // 重新登录
      router.replace('/login')
    } else if (status === 404) {
      Toast('没有资源')
    } else {
      Toast('请求错误' + error.message)
    }
  }

  // 中断当前的错误消息,继续的响应
  return new Promise(() => { })
})
// 暴露axios
export default axios

