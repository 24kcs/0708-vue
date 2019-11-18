<template>
  <div>
    <mt-button type="primary" style="width:100%" @click="showMsg">显示效果</mt-button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  name: 'App',
  methods: {
    showMsg() {
      // Toast('提示信息');
      Toast({
        message: '大哥,啥时候来玩啊',
        position: 'middle',
        duration: 3000
      })
    }
  }
}
</script>
<style scoped>
</style>
