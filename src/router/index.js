import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '../components/HelloWorld'

let routersArr=[];
let r=require.context("../components",true,/\.router\.js/);
// console.log(r.keys())  //["./md/md.router.js", "./qa/qa.router.js"]
r.keys().forEach(key => {
    routersArr=routersArr.concat(r(key).default||[]);
});

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/hello',
            name:'HelloWord',
            component:()=>import('../components/HelloWorld')
        },
        ...routersArr
    ]
})