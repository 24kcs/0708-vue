/**
 * 自己定义事件总线
 * 事件总线的对象:EventBus
 * eventName----事件的名字(事件类型)
 * listener-----回调函数(事件监听)
 * data-------事件触发的时候回调函数需要的数据参数
 * EventBus.on(事件名字,回调函数)---绑定事件
 * EventBus.emit(事件名字,数据)---分发事件(触发事件)
 * EventBus.off(事件名字)-----解绑事件
 * 同一个事件,可以绑定多个回调函数
 * add f1
 * add f2
 * add f3
 * 
 * delete f4
 * delete f5
 * 
 * {add:[f1,f2,f3],delete:[f4,f5]}---容器
 * 
 * emit('add','123)
 * 
 * 写一个方法,用来绑定事件,
 * 调用方法绑定事件
 * EventBus.on('事件名字',回调)
 * this.$bus.$on('add',回调1)
 * this.$bus.$on('add',回调2)
 * this.$bus.$on('del',回调3)
 * 
 * this.$bus.$emit('add')
 * 
 * // 变量---容器,存储事件和这个事件对应的回调函数
 *  数组  [回调1,回调2,回调3,.......]
 * {'add': [回调1,回调2,回调3,.......],'del':[回调1,回调2]}
 * 
 * 
 */
(function (window) {
  // 定义事件总线对象
  const EventBus = {}
  // 定义一个容器对象,用来存储每个事件名字对应的自己的所有的回调函数
  let listenerContainer = {}
  // 定义绑定事件的方法
  EventBus.on = function (eventName, listener) {
    let listeners = listenerContainer[eventName]
    if (!listeners) {
      // 用来存储回调函数
      listeners = []
      // {'add':[函数1,函数2]}
      listenerContainer[eventName] = listeners
    }
    // 把回调添加到该事件名字对应的数组中了
    listeners.push(listener)
  }
  // 分发事件
  // EventBus.emit('add12313123123213123',data)
  EventBus.emit = function (eventName, data) {

    // 根据事件名字找到该事件对应的所有的回调(是一个数组)
    const listeners = listenerContainer[eventName]
    if (listeners && listeners.length > 0) {
      listeners.forEach(listener => {
        // 调用
        listener(data)
      })
    }
  }
  // 解绑事件
  // EventBus.off()
  // EventBus.off('add')
  EventBus.off = function (eventName) {
    //{'add': [回调1,回调2,回调3,.......],'del':[回调1,回调2]}
    if (typeof eventName === 'undefined') {
      listenerContainer = {}
    } else {
      delete listenerContainer[eventName]
      // 或者
      // listenerContainer[eventName]=[]
    }
  }

  // 向外暴露这个对象
  window.EventBus = EventBus
})(window)

// EventBus.on('addfdsfsdfdsf',(data)=>{
//   console.log(data)
// })
// EventBus.emit('addfdsfsdfdsf','哈哈')


