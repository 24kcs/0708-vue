;(function () {



  // 新获取所有的a
  var aObjs = document.querySelectorAll('.app .footer .footerItem')
  // 再获取所有的section
  var sections = document.querySelectorAll('.app .content section')
  // 遍历,a标签,并注册点击事件
  for (var i = 0; i < aObjs.length; i++) {
    var itemA = aObjs[i]
    ;(function(i){
      itemA.addEventListener('touchend', function () {
        // 遍历section,干掉里面的className
        for (var j = 0; j < aObjs.length; j++) {
          sections[j].className = ''
          aObjs[j].className = 'footerItem'
        }
        // 当前的a有active
        this.className = 'footerItem active'
        sections[i].className = 'on'
  
      }, false)
    })(i)
  }




  //  // 新获取所有的a
  //  var aObjs = document.querySelectorAll('.app .footer .footerItem')
  //  // 再获取所有的section
  //  var sections = document.querySelectorAll('.app .content section')
  //  // 遍历,a标签,并注册点击事件
  //  for (let i = 0; i < aObjs.length; i++) {
  //    var itemA = aObjs[i]
  //    // 注册点击事件
  //    itemA.addEventListener('touchend', function () {
  //      // 遍历section,干掉里面的className
  //      for (var j = 0; j < aObjs.length; j++) {
  //        sections[j].className = ''
  //        aObjs[j].className = 'footerItem'
  //      }
  //      // 当前的a有active
  //      this.className='footerItem active'
  //      sections[i].className='on'

  //    }, false)
  //  }





  // // 新获取所有的a
  // var aObjs = document.querySelectorAll('.app .footer .footerItem')
  // // 再获取所有的section
  // var sections = document.querySelectorAll('.app .content section')
  // // 遍历,a标签,并注册点击事件
  // for (var i = 0; i < aObjs.length; i++) {
  //   var itemA = aObjs[i]
  //   itemA.index=i
  //   // 注册点击事件
  //   itemA.addEventListener('touchend', function () {
  //     // 遍历section,干掉里面的className
  //     for (var j = 0; j < aObjs.length; j++) {
  //       sections[j].className = ''
  //       aObjs[j].className = 'footerItem'
  //     }
  //     // 当前的a有active
  //     this.className='footerItem active'
  //     sections[this.index].className='on'

  //   }, false)
  // }



  // 轮播图


  new Swiper('.swiper-container', {
    // 间隔
    spaceBetween: 30,
    centeredSlides: true,
    // 自动播放
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
    // 点击的操作
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // 循环播放
    loop: true
  });
})(window)