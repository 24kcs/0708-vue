<template>
  <div>
    <!--动态组件-->
    <!-- <button @click="toggleComponent">切换组件</button>
    <component :is="current"></component>-->

    <!--缓存组件-->
    <!-- <button @click="toggleComponent">切换组件</button>
    <keep-alive>
      <component :is="current"></component>
    </keep-alive>-->

    <!--异步组件-->
    <!-- <AsyncComponent1/> -->
    <!-- <AsyncComponent2/> -->
    <AsyncComponent3/>
  </div>
</template>
<script>
import Vue from 'vue'
Vue.component('AsyncComponent1', function(resolve, reject) {
  setTimeout(function() {
    // 向 `resolve` 回调传递组件定义
    resolve({
      data() {
        return {
          msg: '小谭谭'
        }
      },
      template: '<div>华哥说我喜欢:{{msg}}</div>'
    })
  }, 1000)
})

// 先引入一个组件,注册成为一个异步组件
Vue.component('AsyncComponent2', function (resolve) {
  require(['./AsyncComponent2'], resolve)
})
Vue.component(
  'AsyncComponent3',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./AsyncComponent3')
)


/**
 * 动态组件:使用<component>标签 配合 :is="表达式" 表达式内部存储的是一个组件的名字
 * 异步组件:将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。
 * 静态引入不能单独打包,动态引入才可以单独的打包
 * 动态打包两种写法:require()和import()
 *
 */

// 引入第一个和第二个组件
import Dynamic1 from './Dynamic1'
import Dynamic2 from './Dynamic2'
export default {
  data() {
    return {
      current: 'Dynamic1'
    }
  },
  components: {
    Dynamic1,
    Dynamic2
  },
  methods: {
    // 切换组件
    toggleComponent() {
      this.current = this.current === 'Dynamic1' ? 'Dynamic2' : 'Dynamic1'
    }
  }
}
</script>
<style scoped>
</style>