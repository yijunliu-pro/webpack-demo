var webpack = require("webpack");
var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");
//打包时先删除旧文件插件
var CleanWebpackPlugin = require('clean-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "js/[name].[chunkhash].js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
            { test: /\.scss$/, loader: 'style-loader!css-loader!postcss-loader!sass-loader' },
            //presets:指定哪些代码转换器将启用babel
            {
                test: /\.js$/,
                loader: "babel-loader",
                //exclude:/node_modules/,排除node_modules这个文件夹中的代码
                //include:/(admin|consumer)//表示只针对这两个文件夹中的代码进行打包
                //include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）
                exclude: /node_modules/
            },
            {
                //配置信息的参数“?limit=8192”表示将所有小于8kb的图片都转为base64形式 （其实应该说超过8kb的才使用 url-loader 来映射到文件，否则转为data url形式）
                test: /\.(png|jpg)$/,
                //加载器支持通过查询字符串的方式接收参数
                loader: 'url-loader?limit=8192'
            },
        ]
    },
    devServer: {
        contentBase: __dirname + "/dist",
        port: 8080, //默认端口号
        inline: true //实时刷新
    },
    plugins: [
        new htmlWebpackPlugin({
            title: "this is 模板",
            filename: "index.html",
            template: "index.html",
            inject: "head"
        }),
        new CleanWebpackPlugin(
            ['dist/js/main.*.js', 'dist/index.*.html'], //要删除的文件目录匹配
            {
                root: __dirname, //根目录
                verbose: true, //开启在控制台输出信息
                dry: false　 //启用删除文件
            }
        ),
        //压缩
        new UglifyJsPlugin({
            exclude: /\/node_modules/ //排除该文件夹
        }),
        //引入jq插件
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};