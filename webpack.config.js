var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: "./example/src/example.js",
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	plugins: [new HtmlWebpackPlugin({template: 'example/src/index.html'})],
	module: {
		loaders: [
			{ test: /\.css$/, loader: "style!css" },
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel', 
			}
		]
	}
};


