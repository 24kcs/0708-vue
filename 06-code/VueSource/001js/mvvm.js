// 构造函数
function MVVM(options) {
    // options---配置对象---
    // 把配置对象保存起来
    this.$options = options || {};
    // 获取data对象,并保存起来, data变量和_data中存储的就是vm.data数据
    var data = this._data = this.$options.data;
    // 把vm实例对象保存到me变量中
    var me = this;
    // 遍历vm.data中所有的键----key--msg
    Object.keys(data).forEach(function(key) {
        // 实现数据代理操作
        me._proxyData(key);
    });
    // 计算属性的
    this._initComputed();
    // 劫持-----------------------后天分析
    observe(data, this);
    // 今天分析----编译---初始化操作
    this.$compile = new Compile(options.el || document.body, this)
}
// 原型
MVVM.prototype = {
    constructor: MVVM,
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },
    // 实现代理
    _proxyData: function(key, setter, getter) {
        // 把vm实例保存到me变量中
        var me = this;
        // 为vm添加的是data对象中的属性
        setter = setter || 
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                // 把_data中的msg的值获取,返回给vm.msg属性
                return me._data[key];
            },
            set: function proxySetter(newVal) {
                // vm.msg='新的值'---进入到set
                // 把新的值给了vm._data.msg属性
                me._data[key] = newVal;
            }
        });
    },

    _initComputed: function() {
        var me = this;
        var computed = this.$options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(function(key) {
                Object.defineProperty(me, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set: function() {}
                });
            });
        }
    }
};