<template>
  <h2 v-if="firstView">请输入关键字</h2>
  <h2 v-else-if="loading">正在加载中....</h2>
  <h2 v-else-if="errorMsg">请求失败,错误信息:{{errorMsg}}</h2>
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
// 引入axios
import axios from 'axios'
export default {
  name: 'Main',
  data() {
    return {
      firstView: true, // 第一次显示的信息的状态
      loading: false, // 正在加载的提示信息的状态
      errorMsg: '', // 错误信息
      users: [] // 用来存储多个用户信息对象
    }
  },
  // 界面加载完毕后绑定事件
  mounted() {
    // 绑定事件
    this.$bus.$on('search', async searchName => {
      const url = `https://api.github.com/search/users`
      // 修改状态数据
      this.firstView = false
      this.loading = true
      try {
        // 发送请求
        const response = await axios.get(url, {
          params: {
            q: searchName
          }
        })
        // 获取到了用户的相关信息
        const users = response.data.items.map(user => ({
          login: user.login,
          html_url: user.html_url,
          avatar_url: user.avatar_url
        }))
        // 更新状态数据------明天就知道了
        this.loading = false
        this.users = users  
      } catch (error) {
        // 更新状态数据
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