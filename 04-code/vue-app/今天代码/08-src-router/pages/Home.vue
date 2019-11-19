<template>
  <div>
    <h2>Home</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
         <router-link class="router-link-exact-active" to="/home/news">News</router-link>
          
        </li>
        <li>
          <router-link class="router-link-exact-active" to="/home/messages">Message</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
</style>