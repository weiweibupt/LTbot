import service from './service.js';
import qs from 'qs';

function myserve(){
    this.serve=service;
}

myserve.prototype.parseRouter=function(name,urlObj){
    var ob=this[name]={};
    Object.keys(urlObj).forEach(item=>{
        ob[item]=this.sendMes.bind(this,urlObj[item]);
    })
}

myserve.prototype.sendMes=function(url,config){
    config=config||{}
    var type=config.type||'get';
    var data=config.data||{};
    var success=config.success||defaultSuccessFn;
    var error=config.error||defaultErrorFn;

    var self=this;

    var state={
        get:function(){
            var urlqs=url+"?"+qs.stringify(data);
            self.serve.get(urlqs).then(success).catch(error);
        },
        post:function(){
            self.serve.post(url,data).then(success).catch(error);
        }
    }


    state[type]();

}

function defaultSuccessFn(){
    console.log("default-sucess-fn")
}


function defaultErrorFn(){
    console.log("default-error-fn")
}

export default new myserve;