// 引入mock
import Mock from 'mockjs'
// 引入data数据
import data from './data.json'
// 拦截ajax请求,生成随机数据
Mock.mock('/goods', { code: 0, data: data.goods })
Mock.mock('/ratings', { code: 0, data: data.ratgins })
Mock.mock('/info', { code: 0, data: data.info })
