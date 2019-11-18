/**
 * 
 * PubSub----消息订阅对象
 * subscribe(msg,subscriber)
 * publish(msg,data)
 * publishSync(msg,data)
 * unsubscribe(token)
 * msg----消息名字
 * subscriber---回调
 * data---数据
 * token---标识
 * 
 * 
 */
(function (window) {
  // 定义消息订阅对象
  const PubSub = {}
  let subscriberContainer = {}
  let id = 0
  // 消息订阅
  PubSub.subscribe = function (msg, subscriber) {
    let subscribers = subscriberContainer[subscriber]
    if (!subscribers) {
      subscribers = {}
      subscriberContainer[msg] = subscribers
    }
    const token = 'id_' + ++id
    subscribers[token] = subscriber
    return token
  }
  // 消息发布
  PubSub.publish = function (msg, data) {
    const subscribers = subscriberContainer[msg]
    setTimeout(() => {
      if (subscribers) {
        Object.values(subscribers).forEach(subscriber => {
          subscriber(data)
        })
      }
    }, 1000);
  }

  // 消息发布
  PubSub.publishSync = function (msg, data) {
    const subscribers = subscriberContainer[msg]
    if (subscribers) {
      Object.values(subscribers).forEach(subscriber => {
        subscriber(data)
      })
    }
  }

  // 取消订阅
  PubSub.unsubscribe = function (token) {
    if(typeof token ==='undefined'){
      subscriberContainer={}
    }else if(token.indexOf('id_')!=-1){
      const subscribers=Object.values(subscriberContainer).find(subscribers=>subscribers[token])
      subscribers&&delete subscribers[token]
    }else{
      subscriberContainer[token]={}
    }
  }


  window.PubSub = PubSub
})(window)