function Observer(data) {
    // 把vm中的data保存到劫持对象的data中
    this.data = data;
    // 开始执行----开始要产生了dep
    this.walk(data);
}

Observer.prototype = {
    constructor: Observer,
    walk: function(data) {
        // me 是当前的劫持实例对象
        var me = this;
        // 遍历的是vm中的data中所有的属性
        Object.keys(data).forEach(function(key) {
            // key就是vm中data对象中的属性名字
            // 传入了属性和值 
            //vm ---->data------->msg:'真好'
            me.convert(key, data[key]);
        });
    },
    convert: function(key, val) {
        //key---msg,val----'真好'
        // this.data----->劫持对象的data,------>vm中data中的msg属性,'真好的值'
        this.defineReactive(this.data, key, val);
    },
    // 劫持对象的data
    defineReactive: function(data, key, val) {
        // 产生dep对象(id唯一,subs数组)
        var dep = new Dep();
        // 找val这个值是不是对象,如果是对象,继续产生dep
        var childObj = observe(val);
        // 为劫持对象的data添加属性和值-----每个属性都会对应一个dep
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                if (Dep.target) {
                    // dep对象的depend方法,把dep添加到watcher中了
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                // 判断新值和旧值是否一致
                if (newVal === val) {
                    return;
                }
                // 不一致开始更新
                val = newVal;
                // 如果新的值是一个对象,那么就继续为对象及对象中的属性创建dep
                childObj = observe(newVal);
                // 通知watcher开始更新了
                dep.notify();
            }
        });
    }
};
// 负责劫持
function observe(value, vm) {
    // 如果value不是对象,里面没有值,此时直接return,啥也不做
    if (!value || typeof value !== 'object') {
        return;
    }
    // 创建劫持对象,data中的属性的值是对象,
    return new Observer(value);
};


var uid = 0;
// Dep构造函数
function Dep() {
    // id是唯一的
    this.id = uid++;
    // 数组---订阅消息的数组
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        // 把dep对象保存到了watcher中
        //  Dep.target---watcher对象
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        // 当前的dep中的subs数组中有watcher对象,要进行遍历
        this.subs.forEach(function(sub) {
            //sub---watcher,调用更新的方法
            sub.update();
        });
    }
};

Dep.target = null;