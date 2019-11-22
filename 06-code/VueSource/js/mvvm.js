function MVVM(options) {
    // options----->传入的配置对象{el:'',data:'',methods:{},computed:{}}
    // 把配置对象保存到$options属性
    this.$options = options || {};
    // 把data中数据保存到两个地方,data局部变量,this._data中
    var data = this._data = this.$options.data;
    // 保存当前的实例对象(MVVM的实例,可以看成是Vue)
    var me = this;

    // 数据代理
    // 把data中所有的属性全部进行遍历,key----属性的名字
    Object.keys(data).forEach(function(key) {
        // 真正的数据代理的实现
        me._proxyData(key);
    });

    this._initComputed();
    // 劫持---------把data劫持走了,遍历data中所有的属性,产生对应个数的dep,
    observe(data, this);

    // 模版编译---模版解析,传入了当前的选择器: #app,或者是body标签,并传入vm实例对象
    this.$compile = new Compile(options.el || document.body, this)
}
// 原型对象
MVVM.prototype = {
    // 构造器
    constructor: MVVM,
    // 监视
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },
    // 真正的数据代理
    // 
    _proxyData: function(key, setter, getter) {
        // 把当前的实例对象再次保存到me中
        var me = this;
        setter = setter || 
        Object.defineProperty(me, key, {
            // 把key中的属性直接给了this,this.msg
            // me--this,key---'msg'
            configurable: false,
            enumerable: true,
            // 重写get
            get: function proxyGetter() {
                return me._data[key]; // 如果有vm.msg----就会进来
            },
            // 重写set
            set: function proxySetter(newVal) {
                me._data[key] = newVal; // vm.msg='值' ----就会进来
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