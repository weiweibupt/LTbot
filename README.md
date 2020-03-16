# vue模板

## 下载模块
```
cnpm install
```

## 运行
```
npm run serve
```

## dll优化
```
npm run dll
```

## 打包
```
npm run build
```

## webpack-bundle-analyzer可视化分析
```
npm run report
```
*打开 http://127.0.0.1:8888/ 查看analyzer图片*
# 介绍：

## 模块化，每个模块下有单独的路由和API层


## 封装API层，接口API化，自动绑定，防止同一接口多次提交
## 自动注册路由、API
## webpack打包优化 
- dll  
- HappyPack 
- webpack-parallel-uglify-plugin  
- compression-webpack-plugin

##目录结构

│  test.js                //express服务器
│  vue.config.js          //webpack配置
│  webpack.dll.conf.js    //dll配置
│  
├─dist                   //打包结果
│         
└─src
    │  App.vue
    │  main.js
    │  
    ├─assets
    │      logo.png
    │      
    ├─components
    │  │  HelloWorld.vue 
    │  │  
    │  ├─common
    │  │      first.vue 
    │  │      global.js      //全局注册组件
    │  │      second.vue
    │  │      
    │  ├─md                   //md模块       
    │  │  │  md.router.js     //该模块路由
    │  │  │  
    │  │  ├─api
    │  │  │      md.api.js    //注册API
    │  │  │      
    │  │  └─views
    │  │          mdtest.vue   //示例组件 /#/mdtest
    │  │          
    │  └─qa
    │      │  qa.router.js
    │      │  
    │      ├─api
    │      │      qa.api.js
    │      │      
    │      └─views
    │              qatest.vue
    │              
    ├─router
    │      index.js              //自动注册路由
    │      
    └─service
            api.js               //自动化注册API
            request.js           //接口API化
            service.js           //axios设置拦截


