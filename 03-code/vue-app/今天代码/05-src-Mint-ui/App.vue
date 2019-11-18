<template>
  <div>
    <mt-button type="primary" @click="showMsg" style="width:100%">primary</mt-button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  methods: {
    showMsg() {
      Toast({
        message: '提示',
        position: 'bottom',
        duration: 5000
      })
    }
  }
}
</script>
<style scoped>
</style>