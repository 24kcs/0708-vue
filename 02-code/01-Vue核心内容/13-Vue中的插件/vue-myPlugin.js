(function (window) {
	// 自己定义插件
	const MyPlugin = {}
	MyPlugin.install = function (Vue, options) {
		// 1. 添加全局方法或属性
		Vue.myGlobalMethod = function () {
			// 逻辑...
			console.log('全局方法')
		}
		// 2. 添加全局资源
		Vue.directive('my-directive', {
			bind (el, binding, vnode, oldVnode) {
				el.innerHTML=binding.value+'========'
			}
		})
		// 4. 添加实例方法
		Vue.prototype.$myMethod = function (methodOptions) {
			// 逻辑...
			console.log('实例方法')
		}
	}

	// 暴露给window
	window.MyPlugin = MyPlugin
})(window)

// 沙箱,沙盒,黑盒---函数的自调用