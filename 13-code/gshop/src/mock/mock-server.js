// 引入Mock
import Mock from 'mockjs'
// 引入data数据
import data from './data.json'

// 拦截地址,产生数据

//接口地址:  '/goods'   '/ratings'   '/info'

Mock.mock('/goods', { code: 0, data: data.goods })
Mock.mock('/ratings', { code: 0, data: data.ratings })
Mock.mock('/info', { code: 0, data: data.info })