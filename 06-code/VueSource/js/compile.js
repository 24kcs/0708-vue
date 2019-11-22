// 编译对象的构造函数
function Compile(el, vm) {
    // 首先保存的是vm实例对象
    this.$vm = vm;
    // 根据选择器获取当前#app的div
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    // 判断容器对象是否存在
    if (this.$el) {
        // 创建文档碎片对象,内部就是div容器中所有的子节点了
        this.$fragment = this.node2Fragment(this.$el);
        // 初始化---遍历容器中的所有的子节点---内存中完成
        this.init();
        // 把文档碎片对象重新加入到div中,界面就编译完毕,并显示最终的效果
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    constructor: Compile,
    node2Fragment: function(el) {
        // 创建文档碎片对象,el----div
        var fragment = document.createDocumentFragment(),
            child;

        // 把div中所有的子节点全部的加入到文档碎片对象中
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        // 并返回当前的文档碎片对象
        return fragment;
    },

    init: function() {
        // 编译元素的方法,传入文档碎片对象
        this.compileElement(this.$fragment);
    },
    // 编译的代码
    compileElement: function(el) {
        // el----文档碎片对象
        // 获取文档碎片对象中所有的子节点
        var childNodes = el.childNodes,
            me = this;// 保存当前的编译对象到me中
        // 遍历当前所有的子节点
        [].slice.call(childNodes).forEach(function(node) {
            // node----文档碎片对象中的每个子节点
            // 获取当前节点中的文本内容
            var text = node.textContent;
            // 获取当前文本的插值内容----插值的正则表达式
            var reg = /\{\{(.*)\}\}/;
            // 判读当前的节点是不是标签
            if (me.isElementNode(node)) {
                // 编译标签中的相关的属性
                me.compile(node);

                // 判读昂当前的节点是不是文本,并且和插值的正则是否匹配
            } else if (me.isTextNode(node) && reg.test(text)) {
                // 编译文本节点,node--当前文本节点,RegExp.$1.trim()是插值语法中的表达式{{(msg)}}---要的是msg
                me.compileText(node, RegExp.$1.trim());
            }
            // 判读当前的节点是不是有子节点
            if (node.childNodes && node.childNodes.length) {
                // 递归调用
                me.compileElement(node);
            }
        });
    },

    compile: function(node) {
        // node----button按钮节点
        // 获取当前这个标签中的所有的属性
        var nodeAttrs = node.attributes,
            me = this;// 保存当前的编译实例对象
        // 把所有的子节点进行遍历
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // attr就是属性:  v-on:click="showName"
            // attrName----->v-on:click
            var attrName = attr.name;
            // 判断当前的这个属性是不是指令
            if (me.isDirective(attrName)) {
                // exp========> showName
                var exp = attr.value;
                // 截取掉了v-
                // dir------->on:click
                var dir = attrName.substring(2);
                // 是不是事件指令
                if (me.isEventDirective(dir)) {
                    //node----button,
                    //me.$vm----vm实例对象
                    //exp ------showName表达式
                    //dir-------on:click
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    // 这是普通指令的编译内容
                    // dir-----v-text ,node---p标签,me.$vm---vm,exp----content
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
                // 此时,按钮已经有了事件了,然后删掉这个按钮上的属性
                node.removeAttribute(attrName);
            }
        });
    },
    // node---文本节点:{{msg}}----exp:表达式----->msg
    compileText: function(node, exp) {
        // 编译工具的这个对象中调用了text()方法,并传入文本节点,和当前的vm实例对象,并传入,msg
        compileUtil.text(node, this.$vm, exp);
    },
    // 判断当前的这个属性是不是指令
    isDirective: function(attr) {
        // 这个属性是不是v-开头的
        return attr.indexOf('v-') == 0;
    },
    // 判读当前的这个指令是不是事件指令
    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },
    // 判断当前的节点是不是标签
    isElementNode: function(node) {
        return node.nodeType == 1;
    },
    // 判断当前的节点是不是文本
    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    // 编译文本
    text: function(node, vm, exp) {
        // node---{{msg}},vm---MVVM实例,exp--->msg

        // 如果是一般指令,node---p,vm,exp---content,'text'
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
        // node---{{msg}},vm实例对象,exp:msg表达式,dir:'text'
        // updaterFn是一个方法,updater['textUpdater']
        var updaterFn = updater[dir + 'Updater'];
        // 如果该方法存在,则调用该方法
        // node---{{msg}},
        //this._getVMVal(vm, exp)---根据vm实例对象找msg这个属性的值:'abc'

        // node----p,this._getVMVal(vm, exp)----vm下面的content的值:<a href="http://www.baidu.com">百度</a>
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        // 先不看---监视---源码中需要配合劫持一起实现数据变化,界面变化的操作
        new Watcher(vm, exp, function(value, oldValue) {
            // 只要是更新操作,就会执行这个函数
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        // node---button,vm,exp---->showName,dir---on:click
        // eventType---->click
        var eventType = dir.split(':')[1],
        // 问:vm中有没有methods对象?有,再问:methods中有没有showName方法
        // fn---showName方法
            fn = vm.$options.methods && vm.$options.methods[exp];
        // 问:click存在吗?---->再问:showName方法存在?
        if (eventType && fn) {
            // 为button绑定点击事件
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
    // 方法作用:替换文本节点内容
    // v-text和{{msg}}插值的替换
    textUpdater: function(node, value) {
        // 把{{msg}}---直接变成了abc
        // v-text指令和插值指令做的事情一样,就p标签中间替换成了<a href="http://www.baidu.com">百度</a>
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    // v-html指令替换
    htmlUpdater: function(node, value) {
        // 把标签中的内容替换成html的形式
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },
    // v-class指令的替换,把标签中class中值拿出来,再把v-class="classA"拿出来,用空格合并到一起,最终给标签的class="cls1 classA"
    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },
    // 表单标签的value值替换
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};