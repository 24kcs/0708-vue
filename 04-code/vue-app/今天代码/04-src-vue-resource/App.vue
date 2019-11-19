<template>
  <div>
    <h2 v-if="!repUrl">正在加载中....</h2>
    <h2 v-else>
      Most Star is <a :href="repUrl">{{repName}}</a>
    </h2>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      repUrl: '', // 路径
      repName: '' // 名字
    }
  },
  mounted() {
    const url = `https://api.github.com/search/repositories?q=v&sort=stars`
    // 发送异步请求
    this.$http
      .get(url)
      .then(response => {
        const result = response.data.items[0]
        // 更新数据
        this.repName = result.name
        this.repUrl = result.html_url
        
      })
      .catch(error => {
        console.log('请求错误:' + error)
      })
  }
}
</script>
<style scoped>
</style>