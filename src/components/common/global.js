//全局引入组件
//将需要全局引入的组件写在src/components/common目录下
import Vue from 'vue'

function changeStr(str){
    return str.charAt(0).toUpperCase()+str.slice(1);
}

const requireComponent = require.context('.',false,/\.vue$/);

requireComponent.keys().forEach(filename=>{
    
    const filePath=requireComponent(filename).default;
    // console.log(filename,filePath)

    const componentName=changeStr(filename.replace(/^\.\//,'').replace(/\.\w+$/,''));
   
    Vue.component(componentName,filePath)
})
