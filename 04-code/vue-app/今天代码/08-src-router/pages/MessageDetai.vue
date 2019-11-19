<template>
  <ul>
    <li>id:{{$route.params.id}}</li>
      <!-- <li>id:{{$route.query.id}}</li> -->
    <li>title:{{detail.title}}</li>
    <li>content:{{detail.content}}</li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      messagesDetail: [
        { id: 1, title: 'message001', content: 'message-detail001' },
        { id: 2, title: 'message002', content: 'message-detail002' },
        { id: 3, title: 'message003', content: 'message-detail003' }
      ],
      detail: {}
    }
  },
  mounted() {
    this.showDetail(this.$route)
  },
  watch: {
    $route(val) {
      this.showDetail(val)
    }
  },
  methods: {
    showDetail(route) {
      const id = route.params.id * 1
      // const id = route.query.id * 1
      // 根据id找对应的对象
      this.detail = this.messagesDetail.find(m => m.id === id)
    }
  }
}
</script>
<style scoped>
</style>