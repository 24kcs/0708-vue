<template>
  <div>
    <p>{{name1}}</p>
    <p>{{name2}}</p>
    <p>{{length}}</p>
  </div>
</template>
<script>
import mixin from './mixin'
export default {
   mixins: [mixin],
  data () {
    return {
      name2:'小健健'
    }
  }
 
}
</script>
<style scoped>
</style>