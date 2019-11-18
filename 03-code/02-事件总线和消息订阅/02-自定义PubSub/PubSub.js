/**
 * 
 * 自定义PubSub实现
 * var token=PubSub.subscribe(msg,subscriber)-------订阅消息
 * PubSub.publish(msg,data)-------发布消息---异步的
 * PubSub.publishSync(msg,data)-------发布消息---同步的
 * PubSub.unsubscribe(token)--------取消消息订阅
 * 
 * msg-----消息名字-----绑定事件的名字
 * subscriber----回调----事件的回调---监听
 * data------回调中要用到的数据参数
 * token----标识
 * 
 * 
 */
(function (window) {
  // 定义消息订阅的对象
  const PubSub = {}
  // 用来存储消息及对应的回调的容器对象
  let subscriberContainer = {}
  let id = 0 // id值
  // 订阅消息
  // var token1=PubSub.subscribe('add',回调1)
  // var token2=PubSub.subscribe('add',回调2)
  // var token3=PubSub.subscribe('del',回调3)
  // 大的容器对象==={'add':[回调1,回调2]}














  // {'add':{token1:回调1,token2:回调2},'del':{token3:回调3}}
  // {'add':{token1:回调}}
  // var token1=PubSub.subscribe('add',回调1)
  PubSub.subscribe = function (msg, subscriber) {
    // 根据消息名字获取的是该消息对应的回调函数的容器(小容器)
    let subscribers = subscriberContainer[msg]
    // 判断小容器是否存在
    if (!subscribers) {
      // 没有这个小容器,那么就创建这个小容器对象
      subscribers = {}
      // 把小容器对象根据msg键,以键值对的方式存储到大容器对象中
      subscriberContainer[msg] = subscribers
    }
    // 创建token
    const token = 'id-' + ++id
    // 根据标识添加对应的回调
    subscribers[token] = subscriber
    return token
  }

  // 发布消息同步
  // PbuSub.publish('add')
  // {'add':{token1:回调1,token2:回调2},'del':{token3:回调3}}
  PubSub.publishSync = function (msg, data) {
    const subscribers = subscriberContainer[msg]
    // 判断
    if (subscribers) {
      // 调用----对象转数组,遍历,找到里面的每个函数,直接调用
      Object.values(subscribers).forEach(subscriber => {
        subscriber(data)
      })
    }
  }


  // 发布消息异步
  PubSub.publish = function (msg, data) {
    const subscribers = subscriberContainer[msg]
    setTimeout(() => {
      // 判断
      if (subscribers) {
        // 调用----对象转数组,遍历,找到里面的每个函数,直接调用
        Object.values(subscribers).forEach(subscriber => {
          subscriber(data)
        })
      }
    }, 1000)
  }

  // 取消消息订阅
  // PubSub.unsubscribe()
  // PubSub.unsubscribe('add')
  // PubSub.unsubscribe('id-2')

  // {'add':{token1:回调1,'id-2':回调2},'del':{token3:回调3}}
  // [{token1:回调1,token2:回调2},{token3:回调3}]
  PubSub.unsubscribe = function (token) {
    // token='add',token='id-2' token--->undefined
    // 啥也没有传
    if (typeof token === 'undefined') {
      subscriberContainer = {}
    } else if (token.indexOf('id-') !== -1) {// 传入了token

      // 根据token找对应的回调
      const subscribers = Object.values(subscriberContainer).find(subscribers => subscribers[token])
      subscribers && delete subscribers[token]
    } else {// 传入的是名字
      delete subscriberContainer[token]
    }
  }

  // 暴露出去
  window.PubSub = PubSub
})(window)