import service from './service.js';
import qs from 'qs';

function myserve() {
    this.serve = service; //axios实例
    this.nowhandle = null; //当前组件实例
}
myserve.prototype.vbind = function (ob) {
    this.nowhandle = ob;
    return this;
}

myserve.prototype.parseRouter = function (name, urlObj) {
    var ob = this[name] = {};
    Object.keys(urlObj).forEach(item => {
        ob[item] = this.sendMes.bind(this, name, item, urlObj[item]); //接口API化
    })
}

myserve.prototype.sendMes = function (moduleName, name, url, config) {
    var config = config || {}
    var type = config.type || 'get';
    var data = config.data || {};
    var success = config.success || defaultSuccessFn;
    var error = config.error || defaultErrorFn;
    var self = this;
    var bindName = config.bindName || name;
    self.nowhandle=config.vm || null;
    self[moduleName][name].state = 'ready';
  


    //策略模式
    var state = {
        get: function () {
            var urlqs = url + "?" + qs.stringify(data);
            self.serve.get(urlqs).then(before).then(success).catch(error);
        },
        post: function () {
            self.serve.post(url, data).then(before).then(success).catch(error);
        }
    }

    //添加遮罩
    function before(mes) {
        self[moduleName][name].state = 'ready';
        return mes;
    }

    function defaultSuccessFn(mes) {
        console.log("default-success-fn")
        self.nowhandle[bindName] = mes.data; //自动绑定
    }


    function defaultErrorFn(err) {
        console.log("default-error-fn");
        console.log(err)
    }


    
    if (self[moduleName][name].state == 'ready') { //防止同一接口多次提交
        self[moduleName][name].state = 'pending'
        state[type]();
    }else{
        console.log("不能发送信息")
    }



}


export default new myserve;