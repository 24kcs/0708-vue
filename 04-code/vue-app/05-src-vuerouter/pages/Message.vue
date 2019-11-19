<template>
  <div>
    <ul>
      <li v-for="(m,index) in messages" :key="index">
        <router-link replace :to="`/home/message/detail/${m.id}`">{{m.title}}</router-link>
        <button @click="pushDetail(m.id)">push查看</button>
        <button @click="replaceDetail(m.id)">replace查看</button>
      </li>
    </ul>
    <button @click="$router.back()">返回</button>
    <hr />
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Message',
  data() {
    return {
      messages: [] // 空数组没有数据
    }
  },
  mounted() {
    console.log(this)
    setTimeout(() => {
      // 界面显示后设置messages的数据
      this.messages = [
        { id: 1, title: 'message001' },
        { id: 3, title: 'message003' },
        { id: 5, title: 'message005' }
      ]
    }, 1000)
  },
  methods: {
    // 编程式路由
    //`/home/message/detail/${m.id}`
    // push方式
    pushDetail(id) {
      // console.log(this.$route.path)

      this.$router.push(`/home/message/detail/${id}`)
    },
    // replace方式
    replaceDetail(id) {
      this.$router.replace(`/home/message/detail/${id}`)
      // if (this.path !== this.$route.path) {

      //    this.path = this.$route.path
      // }
    }
  }
}
</script>
<style scoped>
</style>