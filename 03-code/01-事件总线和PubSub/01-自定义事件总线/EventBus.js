/**
 * 
 * EventBus事件总线对象
 * eventName---事件名字
 * listener---监听---回调
 * data----事件触发的时候传入的参数
 * on(eventName,listener)---绑定事件
 * event(eventName,data)
 * off(eventName)
 * 如何存储一个事件对应的多个回调函数
 * {事件名字:[回调1,回调2]}
 * 一个事件可能会对应多个回调函数,所以,解绑事件的时候,可以根据eventName删除事件
 * 
 */
(function (window) {
  // 创建事件总线对象
  const EventBus = {}
  let listenerContainer = {}
  // 绑定事件
  EventBus.on = function (eventName, listener) {
    // 根据事件名字获取该事件对应的所有的回调函数
    let listeners = listenerContainer[eventName]
    // 判断这个数组是否存在,或者说是否有数据
    if (!listeners) {
      // 不存在,则创建这个数组
      listeners = []
      listenerContainer[eventName] = listeners
    }
    // 把传入的回调函数保存到数组中
    listeners.push(listener)
  }
  // 分发事件
  EventBus.emit = function (eventName, data) {
    const listeners = listenerContainer[eventName]
    if (listeners && listeners.length > 0) {
      listeners.forEach(listener=>{
        listener(data)
      })
    }
  }

  // 解绑事件
  EventBus.off=function(eventName){
    if(typeof eventName ==='undefined'){
      listenerContainer=[] 
    }else{
      delete listenerContainer[eventName]
      // 或者
      // listenerContainer[eventName]=[]
    }
  }


  // 向外暴露事件总线对象
  window.EventBus = EventBus
})(window)