// import api1 from '../components/md/api/md.api.js'
// // import api2 from '../components/qa/api/index.js'

// console.log(api1)
// console.log(api2)

let api={};
let r=require.context('../components',true,/api\.js/);
r.keys().forEach(key=>{
    Object.assign(api,r(key).default) 
})
export default api