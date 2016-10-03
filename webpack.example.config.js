var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
	devtool: 'eval',
	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'./example/src/example'
	],
	output: {
		path: path.join(__dirname, 'dist/examples'),
		filename: '[name].js',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({template: 'example/src/index.html'}),
		new ExtractTextPlugin("[name].css")
	],
	module: {
		loaders: [
			{test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /(node_modules)/
			}]
	}
};
