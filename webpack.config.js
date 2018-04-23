var webpack = require("webpack");
var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextWebapckPlugin = require("extract-text-webpack-plugin"); //抽离css为独立的css文件
// //打包时先删除旧文件插件
var CleanWebpackPlugin = require('clean-webpack-plugin');
// var UglifyJsPlugin = require('uglifyjs-webpack-plugin');//js压缩插件，webpack4.0以上运行npm run build会自动压缩所以不再需要此插件

module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "js/[name].[chunkhash].js"
    },
    devServer: { //配置此静态文件服务器，可以用来预览打包后项目
        contentBase: path.resolve(__dirname, 'dist'), //开发服务运行时的文件根目录
        host: 'localhost', //主机地址
        port: 9090, //端口号
        compress: true, //开发服务器是否启动gzip等压缩
        inline: true, //实时刷新
        historyApiFallback: true, //不跳转
        //open:true,
        //hot:true
        proxy: {
            // 请求到 '/api' 下 的请求都会被代理到 target： http://debug.xxx.com 中
            '/api/*': {
                target: 'http://ws.cms.webdev.com',
                secure: false, // 接受 运行在 https 上的服务
                changeOrigin: true
            }
        },
        // proxy: {
        //     // 请求到 '/device' 下 的请求都会被代理到 target： http://debug.xxx.com 中
        //     '/device/*': {
        //         target: 'http://debug.xxx.com',
        //         secure: false, // 接受 运行在 https 上的服务
        //         changeOrigin: true
        //     }
        // }
    },
    //  其他配置略
    // resolve: {
    //     //extensions: ['', '.js', '.es6', '.vue'],
    //     alias: {
    //         //  也可以不写
    //         jquery: 'jquery/jquery.min.js',
    //     }
    // },
    module: {
        rules: [{
                test: /\.css$/,
                // loader:['style-loader','css-loader']
                use: ExtractTextWebapckPlugin.extract({
                        use: 'css-loader!postcss-loader',
                        publicPath: '../' //解决css背景图的路径问题
                    }) //不再需要style-loader

            },
            {
                test: /\.less$/,
                use: ExtractTextWebapckPlugin.extract({ //分离less编译后的css文件
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader'] // 编译顺序从右往左
                })
            },
            {
                test: /\.(sass|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            // {
            //     test:/\.(png|jpg|gif)$/,
            //     use:[{
            //         loader:'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
            //         //include:path.join(__dirname,'./src'),
            //         //exclude:/node_modules/, //include、exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）
            //         options:{ // 这里的options选项参数可以定义多大的图片转换为base64
            //             limit:50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
            //             name:'[name].[ext]?[hash]',
            //             outputPath:'images/' //定义输出的图片文件夹
            //         }
            //     }]
            // },

            //img图片
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            {
                test: /\.(png|gif|jpg|svg|jpeg)$/i,
                use: {
                    loader: 'file-loader',
                    query: {
                        name: 'images/[name]_[hash].[ext]'
                    }
                }
            },
            //presets:指定哪些代码转换器将启用babel
            {
                test: /\.js$/,
                loader: "babel-loader",
                //exclude:/node_modules/,//排除node_modules这个文件夹中的代码
                //include:/(admin|consumer)//表示只针对这两个文件夹中的代码进行打包
                //include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）
                exclude: /node_modules/
            },
            { //json-loader
                test: /\.json$/,
                use: 'json-loader'
            }
            // {
            //     test: require.resolve('jquery'),
            //     loader: 'expose-loader?jQuery!expose-loader?$'
            // },
            // {
            //     test: require.resolve('jquery'),
            //     loader: 'expose-loader?jQuery!expose-loader?$!expose-loader?scrollable'
            // },
        ]
    },
    plugins: [
        //产出html
        new htmlWebpackPlugin({
            title: "this is 模板",
            template: path.resolve(__dirname, 'src', 'index.html'), //模板
            filename: 'index.html',
            hash: true, //防止缓存
            //inject: "head",
            minify: {
                removeAttributeQuotes: true //压缩 去掉引号
            }
        }),
        //生成独立的css文件，括号里要生成的css路径和名,配合着css文件使用
        new ExtractTextWebapckPlugin('css.css'),
        //new Webpack.HotModuleReplacementPlugin() //调用webpack的热更新插件



        new CleanWebpackPlugin(
            ['dist/js/*.js', 'dist/index.*.html'], //要删除的文件目录匹配
            {
                root: __dirname, //根目录
                verbose: true, //开启在控制台输出信息
                dry: false　 //启用删除文件
            }
        ),
        // //压缩
        // new UglifyJsPlugin({
        //     exclude: /\/node_modules/ //排除该文件夹
        // }),
        //引入jq插件
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     "window.jQuery": "jquery"
        // })
    ]
};