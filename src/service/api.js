//自动注册API

let api={};
let r=require.context('../components',true,/api\.js/);
r.keys().forEach(key=>{
    Object.assign(api,r(key).default) 
})
export default api