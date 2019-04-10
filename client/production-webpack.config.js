const path = require('path');
require("@babel/polyfill");
var BrotliPlugin = require('brotli-webpack-plugin')
var webpack = require('webpack');
module.exports = {
    entry: ['@babel/polyfill','./src/app.js'],
    output: {
        path: path.join(__dirname,'/public'),
        filename: '[name].bundle.js'
    },
    plugins: [
	// 	new BrotliPlugin({
	// 		asset: '[path].br[query]',
	// 		test: /\.(js|css|html|svg)$/,
	// 		threshold: 10240,
	// 		minRatio: 0.8
    // 	})
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
	],
    // optimization: {
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			commons: {
	// 				test: /[\\/]node_modules[\\/]/,
	// 				name: 'vendors',
	// 				chunks: 'all'
	// 			}
	// 		}
	// 	}
	// },
    module: {
        rules : [{
            loader:'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test:/\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devServer: {
        contentBase: path.join(__dirname,'/public'),
        historyApiFallback: true
    }

};