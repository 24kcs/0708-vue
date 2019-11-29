// 包含了多个状态数据的对象
export default {
  // 经度
  longitude: '116.36867',
  // 纬度
  latitude: '40.10038',
  // 地址信息---对象
  address: {},
  // 食品分类信息--数组
  categorys: [],
  // 商铺列表信息--数组
  shops: [],
  // 用户信息
  user: {},
  // token信息---本身存储的是字符串
  token: localStorage.getItem('token_key')
}