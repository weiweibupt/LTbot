const webpack = require('webpack')
const path = require('path')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin=require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            new webpack.DllReferencePlugin({ //仅打包一次不变的第三方模块
                context: process.cwd(), //与DllPlugin中的context保持一致
                /*这个地址对应webpack.dll.conf.js中生成的那个json文件的路径，这样webpack打包的时候
                会检测当前文件中的映射，不会把已经存在映射的包再次打包进bundle.js */
                manifest: require('./public/vendor/vendor-manifest.json')
            }),
            new ParallelUglifyPlugin({ //uglifyJS用于压缩代码，ParallelUglifyPlugin是进程的uglifyJS
                cacheDir: '.cache/',
                uglifyJS: {
                    output: {
                        comments: false, //是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
                        beautify: false, //是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
                    },
                    warnings: false, //是否在UglifyJS删除没有用到的代码时输出警告信息
                    compress: {
                        drop_debugger: true,
                        drop_console: false, //是否删除代码中所有的console语句
                    }
                }
            }),
            new HappyPack({ // Webpack 是单线程模型的，happypack把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。
                id: 'babel',
                loaders: ['babel-loader?cacheDirectory=true'],
                threadPool: happyThreadPool
            }),
            new CompressionWebpackPlugin({
                filename: info => {
                    return `${info.path}.gz${info.query}`
                },
                algorithm: 'gzip',
                threshold: 10240,
                test: new RegExp(
                    '\\.(' + ['js'].join('|') +
                    ')$'
                ),
                minRatio: 0.8,
                deleteOriginalAssets: false
            }),
            new BundleAnalyzerPlugin(),
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, './public'),
                to: __dirname + './dist',
                ignore: ['.*']
            }])

        ]
    },
    devServer: {
        // host: "localhost",
        // port: 8888, // 端口号
        // https: false, // https:{type:Boolean}
        // open: false, //配置自动启动浏览器
        // proxy: 'http://localhost:8080' 
        proxy: {
            "/API": {
                target: "http://localhost:3000", // 服务器
                ws: true, // 是否启用websockets
                changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: {
                    '^/API': '' //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
                }
            }

        },


    },
}