<template>
  <div>
    <button @click="showName1">显示name1的值</button>
    <p>name1值:---------{{name1}}</p>

    <button @click="showName2">显示name2的值</button>
    <p>name2值:---------{{name2}}</p>
     <button @click="showName3">显示name3的值</button>
    <p>name3值:---------{{car.name3}}</p>
    
  </div>
</template>
<script>
/**
 * 1.data中return中的数据是响应式的---实现了代理,才有的响应式
 * 2.如果修改data中数据的时候,也会把name2的属性值修改,是因为修改name导致的重新渲染了
 * 3.car.color,不会因为name改变才修改,本身就是响应式的,所以可以改变
 * 只有一次渲染(name,color 是一起渲染的)
 * 4. 必须是data中响应式的对象添加属性,才有效果
 */
import Vue from 'vue'
export default {
  data() {
    this.name2 = '小白'
    return {
      // 响应式数据
      name1: '小明',
      car:{
        name3:'宝马'
      }
    }
  },
  methods: {
    showName1() {
      this.name1 = '小红'
      console.log(this)
    },
    showName2() {
      this.name2 = '小黑'
    },
     showName3() {
      this.car.name3 = '奔驰'
    },
  }

  // data() {
  //   // 非响应式数据
  //   this.name2='张无忌'
  //   return {
  //     // 响应式数据
  //     name1: '小明',
  //     car:{
  //       name3:'宝马'
  //     }
  //   }
  // },
  // methods: {
  //   showName1() {
  //     // 响应式的
  //     this.name1 = '小白'
  //     // 改变的还是原来这个属性的值,只是因为界面重新渲染,一块渲染了（name2加到了return中）
  //     this.name2='杨过2'

  //     console.log(this)
  //   },
  //   showName2(){
  //     this.name2='杨过4'
  //     console.log(this)
  //   },
  //   showName3(){
  //     //this.car.name3='哈哈'
  //     //this.name2='嘎嘎'
  //     // car是响应式的数据,color不是
  //     //this.car.color='red'
  //     Vue.set(this.car,'color','red')
  //     console.log(this)
  //     //this.name2='卡卡卡'
  //   }
  // }
}
</script>
<style scoped>
</style>