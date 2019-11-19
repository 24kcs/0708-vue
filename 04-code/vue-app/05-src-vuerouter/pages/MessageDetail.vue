<template>
  <ul>
    <li>id:{{$route.params.id}}</li>
    <!-- <li>id:{{id}}</li> -->
    <li>title:{{detail.title}}</li>
    <li>content:{{detail.content}}</li>
  </ul>
</template>
<script>
export default {
  props:['id'],
  data() {
    return {
      messageDetails: [
        { id: 1, title: 'message001', content: 'detail001' },
        { id: 3, title: 'message003', content: 'detail003' },
        { id: 5, title: 'message005', content: 'detail005' }
      ],
      detail: {}
    }
  },
  mounted() {
  
    // 获取id
    // const id = this.$route.params.id * 1
    // this.detail = this.messageDetails.find(message => message.id === id)
    this.showDetail(this.$route)
  },
  watch: {
    $route(val) {
        console.log(this)
      this.showDetail(val)
    }
  },
  methods: {
    showDetail(route) {
      const id = route.params.id * 1
      this.detail = this.messageDetails.find(message => message.id === id)
    }
  }
}
</script>
<style scoped>
</style>