
// // export default {
// //     path:'/md',
// //     component:()=>import('./views/mdtest.vue')
// // }



let arr=[];

const r=require.context('./views',false,/\.vue$/);

r.keys().forEach(key=>{
    let _keyarr=key.split(".");
    console.log(key,_keyarr)
    if(key.indexOf('index')!=-1){
        arr.push({
            path:"/md",
            component:r(key).default
        })
    }else{
        arr.push({
            path:"/md"+_keyarr[1],
            component:r(key).default    //用webpackChunkName把同模块的异步加载都放到一个包里    
        })
    }
})

export default arr;

// export default [
//     {
//         path:'/md',
//         component:()=>import('./views/mdtest.vue')
//     }
// ]