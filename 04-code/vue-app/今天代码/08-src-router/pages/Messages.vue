<template>
  <div>
    <ul>
      <li v-for="(m,index) in messages" :key="index">
        <router-link replace :to="`/home/messages/detail/${m.id}`">{{m.title}}</router-link>
        <button @click="goPush(m.id)">push查看</button>
        <button @click="goReplace(m.id)">replace查看</button>
      </li>
    </ul>
    <button @click="$router.back()">返回</button>
    <hr />
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      messages: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.messages = [
        { id: 1, title: 'message001' },
        { id: 2, title: 'message002' },
        { id: 3, title: 'message003' }
      ]
    }, 1000)
  },
  methods: {
    goPush(id){
      this.$router.push(`/home/messages/detail/${id}`)
    },
    goReplace(id){
      this.$router.replace(`/home/messages/detail/${id}`)
    },
  }
}
</script>
<style scoped>
</style>