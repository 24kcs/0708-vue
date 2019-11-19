<template>
  <h2 v-if="firstView">请输入关键字</h2>
  <h2 v-else-if="loading">正在加载中.....</h2>
  <h2 v-else-if="errorMsg">请求失败:{{errorMsg}}</h2>
  <div class="row" v-else>
    <div class="card" v-for="(user,index) in users" :key="index">
      <a :href="user.html_url" target="_blank">
        <img :src="user.avatar_url" style="width: 100px" />
      </a>
      <p class="card-text">{{user.login}}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Main',
  data() {
    return {
      firstView: true, // 默认第一个提示信息
      loading: false, // 正在加载中的
      errorMsg: '', // 错误消息
      users: [] // 存储用户信息
    }
  },
  mounted() {
    this.$bus.$on('search', async searchName => {
      try {
        // 修改状态数据
        this.firstView = false
        this.loading = true
        // 地址
        const url = `https://api.github.com/search/users`
        const response = await axios.get(url, {
          params: {
            q: searchName
          }
        })
        // 获取信息
        const users = response.data.items.map(item => ({
          login: item.login,
          avatar_url: item.avatar_url,
          html_url: item.html_url
        }))

        // 修改状态数据
        this.loading = false
        this.users = users
      } catch (error) {
        this.loading = false
        this.errorMsg = error.message
      }
    })
  }
}
</script>
<style scoped>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>