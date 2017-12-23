
var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数的方法
var getHtmlConfig =function(name){
  return {
    template      : './src/view/'+name+'.html',
    filename      : 'view/index.html',
    inject        : true,
    hash          : true,
    chunks        : ['common',name]
  }
}
//webpack config
var config = {
	entry:{
		'common' : ['./src/page/common.js','webpack-dev-server/client?http://localhost:8088/'],
		'index'  : ['./src/page/index/index.js'],
		'hello'  : ['./src/page/index/hello.js']
		
		
	},
      
     output: {
         path : './dist',
         publicPath : '/dist',
         filename : 'js/[name].js'
     },
      externals : {
      	'jquery' : 'window.jQuery' //jquery模块
      },
      module : {
      	loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            /*{
                test: /\.string$/, 
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
            }*/
        ]
      },
      plugins : [
      	// 独立通用模块到js/base.js
     	new webpack.optimize.CommonsChunkPlugin({
     		name : 'common',
     		filename : 'js/base.js'//公共模块
     	}),
     	// 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index'))
      ]
};

  if('dev' === WEBPACK_ENV){
      config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
  }

 module.exports = config;