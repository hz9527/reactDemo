const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const poststylus = require('poststylus');
// const autoprefixer = require('autoprefixer');
module.exports = {
	entry: "./src/main.js",
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: ""
	},
	devServer: {
		proxy: {
		  "/modelPool/getMyPageList": {
		    target: "http://10.37.18.199:8004",
		    secure: false
		  },
            "/modelPool/getMyCount": {
                target: "http://10.37.18.199:8004",
                secure: false
            },
            "/modelPool/getPageList": {
                target: "http://dev.daojia.com:8004",
                secure: false
            },
            "/modelPool/saveModel": {
                target: "http://dev.daojia.com:8004",
                secure: false
            }
		}
	},
	resolve: {
		alias: {},
		extensions: ['.js', '.styl', '.css']
	},
	module: {
		// configuration regarding modules
		rules: [
			// rules for modules (configure loaders, parser options, etc.)
			{
		        test: /\.jsx?$/,
		        include: [
		          path.resolve(__dirname, "src")
		        ],		    
		        loader: "babel-loader"
		    },
		    {
		    	test: /\.styl$/,
		    	use: [
		    		'style-loader',
		    		{
		    			loader: 'css-loader',
		    			options: {
		    				modules: true,
        					localIdentName: '[path][name]__[local]--[hash:base64:5]'
		    			}
		    		},
		    		'stylus-loader'
		    	]
		    },
		    {
            	test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            	loader: 'url-loader',
            	query: {
                	limit: 10000,
                	name: path.resolve(__dirname,'img/[name].[hash:7].[ext]')
            	}
        	},
        	{
	            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
	            loader: 'url-loader',
	            query: {
	                limit: 10000,
	                name: path.resolve(__dirname,'fonts/[name].[hash:7].[ext]')
	            }
	        },
		    {
		    	test: /\.css$/,
		    	use: [
		    		'style-loader',
		    		{
		    			loader: 'css-loader'
		    		}
		    	]
		    }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: '流量统计系统',
			filename: 'index.html',
			template: 'index.html',
			inject: true
		}),
		new webpack.LoaderOptionsPlugin({
		    options: {
		      stylus: {
		        use: [poststylus(['autoprefixer'])]
		      }
		    }
		})
	],
	node: {
  		fs: "empty"
	}
}