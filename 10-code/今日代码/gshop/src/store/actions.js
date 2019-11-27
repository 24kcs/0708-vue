// 包含了多个间接修改状态数据的方法的对象
import { RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USER, RECEIVE_TOKEN, RESET_USER, RESET_TOKEN } from './mutation-types'
// 引入api
import { reqAddress, reqCategorys, reqShopList, reqAutoLogin } from '../api'
export default {
  // 获取地址信息
  async getAddress ({ state, commit }) {
    const { longitude, latitude } = state
    const result = await reqAddress({ longitude, latitude })
    // 判断请求是否成功
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }

  },
  // 获取分类信息
  async getCategorys ({ commit }, cb) {
    const result = await reqCategorys()
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
      typeof cb === 'function' && cb()
      // if(typeof cb==='function'){
      //   cb()
      // }

    }
  },
  // 获取商铺列表信息
  async getShops ({ state, commit }) {
    const { longitude, latitude } = state
    const result = await reqShopList({ longitude, latitude })
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },
  // 保存用户信息
  saveUser ({ commit }, user) {
    // 从user中取出token
    const token = user.token
    // 保存到state中
    commit(RECEIVE_TOKEN, token)
    // 保存到localStorage中
    localStorage.setItem('token_key', token)
    // 删除user中的token
    delete user.token
    // 保存用户到state中
    commit(RECEIVE_USER, user)
  },
  // 重置用户信息
  resetUser ({ commit }) {
    // 重置user
    commit(RESET_USER)
    // 重置token
    commit(RESET_TOKEN)
    // 删除localStorage中的token
    localStorage.removeItem('token_key')
  },
  // 自动登录操作 
  async autoLogin ({ commit, state }) {
    // 判断state中是否有token
    if (state.token) {
      // 自动登录
      const result = await reqAutoLogin()
      const user = result.data
      // 更新user
      commit(RECEIVE_USER, user)
    }
  }
}