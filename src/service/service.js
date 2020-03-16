import axios from 'axios';

const service=axios.create({
    baseURL:"/API",
    timeout:5000
})

service.interceptors.request.use( //请求拦截
    config=>{
        if(sessionStorage.getItem('token')){ //token,防止CSRF
            config.headers['token']=sessionStorage.getItem('token')||'';
            config.headers['ContentType']='application/json;charset-utf-8';
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)

// service.interceptors.response.use( //相应拦截
//     res =>{
//         if(res.code=='404'){
//             console.log('404')
//         }else if(res.code=='401'){
//             console.log('401')
//         }else{
//             console.log(res)
//         }
//         return res;
//     },
//     error=>{
//         return Promise.reject(error);
//     }
// )

export default service;