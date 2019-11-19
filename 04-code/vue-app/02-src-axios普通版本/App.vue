<template>
  <div>
    <h2 v-if="!repUrl">正在加载中...</h2>
    <h2 v-else>
      Most Star is
      <a :href="repUrl">{{repName}}</a>
    </h2>
  </div>
</template>
<script>
// 引入axios
import axios from 'axios'
export default {
  // 状态数据
  data() {
    return {
      repUrl: '', // 获取到的技术的链接
      repName: '' // 用来存储技术名字
    }
  },
  // 界面加载完毕
  mounted() {
    
    const url = `https://api.github.com/search/repositories?q=v&sort=stars`
    axios
    .get(url)
    .then(response=>{
      // console.log(response)
      const result=response.data.items[0]
      // 更新状态数据
      this.repUrl=result.html_url
      this.repName=result.name
    })
    .catch(error=>{
      console.log('错误消息:',error)
    })

  }
}
</script>
<style scoped>
</style>