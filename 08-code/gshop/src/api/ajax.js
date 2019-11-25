// 引入axios
import axios from 'axios'
// 引入qs---将对象数据转UrlEncoding
import qs from 'qs'
// 添加请求拦截器
axios.interceptors.request.use(config => {
  const { method, data } = config
  // 判断,method中是不是POST请求,并且data应该是一个对象----->urlEncoding形式
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    config.data = qs.stringify(data)
  }
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  // 断言
  alert(error.message)
  // 中断当前的错误消息,继续的响应
  return new Promise(() => { })
})
// 暴露axios
export default axios
