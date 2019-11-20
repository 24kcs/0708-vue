function Compile(el, vm) {
    // 把vm实例对象保存起来
    this.$vm = vm;
    // 获取容器对象,如果没有则自己获取(根据选择器获取div,id为app)
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    // 判断有没有
    if (this.$el) {
        // 创建文档碎片对象,同时把div中所有的子节点全部 的添加到文档碎片中
        this.$fragment = this.node2Fragment(this.$el);
        // 初始化操作(在文档碎片中对所有的子节点进行初始化)
        this.init();
        // 把文档碎片对象重新的添加到div容器中
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    constructor: Compile,
    // 创建文档碎片对象,并返回
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },
    // 初始化
    init: function() {
        // 编译元素的方法,并传入文档碎片对象
        this.compileElement(this.$fragment);
    },
    // 真正的初始化
    compileElement: function(el) {
        // el --------文档碎片
        // 获取文档碎片中所有的子节点
        var childNodes = el.childNodes,
            me = this;// 把编译对象保存,此时me就是编译对象
        // 遍历所有的子节点
        [].slice.call(childNodes).forEach(function(node) {
            // node---每个子节点
            // 获取当前节点中的文本内容
            var text = node.textContent;
            // 插值的正则表达式
            var reg = /\{\{(.*)\}\}/;
            // 判断当前的节点是不是标签
            if (me.isElementNode(node)) {
                // 如果是标签,就进行编译
                me.compile(node);//=========================
                // 判断当前的节点是文本节点,同时满足插值的正则
            } else if (me.isTextNode(node) && reg.test(text)) {
                // 当前这个文本是插值,传入当前文本节点,并传入msg表达式
                // node---{{msg}}  RegExp.$1.trim()---msg
                me.compileText(node, RegExp.$1.trim());
            }
            // 判断当前的节点有没有子节点,并且子节点是存在
            if (node.childNodes && node.childNodes.length) {
                // 递归
                me.compileElement(node);
            }
        });
    },

    compile: function(node) {
        var nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                // 事件指令
                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        // node---{{msg}}   exp----msg
        // this.$vm----vm实例对象
        compileUtil.text(node, this.$vm, exp);
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },
    // 是不是标签
    isElementNode: function(node) {
        return node.nodeType == 1;
    },
    // 是不是文本
    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    // node---{{msg}},vm,exp---msg
    text: function(node, vm, exp) {
        // 绑定
        this.bind(node, vm, exp, 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // node---{{msg}},vm,exp--msg-, dir---'text'
        // updater---对象
        // dir + 'Updater'--------'textUpdater'
        // updater['textUpdater']
        // updaterFn---函数
        var updaterFn = updater[dir + 'Updater'];
        // 该函数存在? 调用
        //this._getVMVal(vm, exp)---msg的值---'abc'
        // textUpdater({{msg}},'abc')
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        // 后天说
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    // node---{{msg}}   value='abc'
    textUpdater: function(node, value) {
        // 把文本节点的内容直接替换成abc
        // {{msg}}---变成了abc
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};