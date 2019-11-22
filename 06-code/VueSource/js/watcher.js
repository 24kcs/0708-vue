function Watcher(vm, expOrFn, cb) {
    // 保存了回调函数
    this.cb = cb;
    // 保存了vm实例对象
    this.vm = vm;
    // 保存了当前的表达式msg
    this.expOrFn = expOrFn;
    // 创建一个对象,用来保存当前watcher对象对应的dep{0:dep}
    this.depIds = {};
    // 表达式是不是函数
    if (typeof expOrFn === 'function') {
        this.getter = expOrFn;
    } else {
        // 传入表达式,返回一个回调函数,该回调函数的作用就是通过vm.msg获取其值
        this.getter = this.parseGetter(expOrFn.trim());
    }

    this.value = this.get();
}

Watcher.prototype = {
    constructor: Watcher,
    // 更新
    update: function() {
        this.run();
    },
    // 开始更新
    run: function() {
        // 先获取表达式的值
        var value = this.get();
        // 旧值
        var oldVal = this.value;
        // 旧值和新的值不一样
        if (value !== oldVal) {
            // 开始更新
            this.value = value;
            // 创建watcher对象的时候传入的回调函数
            this.cb.call(this.vm, value, oldVal);
        }
    },
    addDep: function(dep) {
       // 如果watcher中的depIds中没有当前的dep
        if (!this.depIds.hasOwnProperty(dep.id)) {
            // 把watcher添加到dep中
            dep.addSub(this);
            // 把dep添加到watcher中
            this.depIds[dep.id] = dep;
            // dep和对应的watcher对象建立关系
        }
    },
    get: function() {
        // 把wacher对象存储到Dep的target中
        Dep.target = this;
        //
        var value = this.getter.call(this.vm, this.vm);
        // 清空
        Dep.target = null;
        // 返回值
        return value;
    },

    parseGetter: function(exp) {
        if (/[^\w.$]/.test(exp)) return; 

        var exps = exp.split('.');
        // 获取的是vm.msg属性的值
        return function(obj) {
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                // 得到了vm.msg的值---->MVVM的属性的get方法中----->Observer中的data中的Object.defineProperty()---->get中,判断Dep.target有值没
                obj = obj[exps[i]];
            }
            return obj;
        }
    }
};