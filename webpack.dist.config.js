var webpack = require('webpack');
var path = require('path');

const config = {
	entry: "./src/ReactFormattedAmount.js", 
	output: {
		library: 'ReactFormattedAmount',
		libraryTarget: 'umd',
		path: path.join(__dirname, 'dist'),
		filename: 'ReactFormattedAmount.min.js',
	},
	externals: [
		{
			react: {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react',
			},
		},
		{
			'react-dom': {
				root: 'ReactDOM',
				commonjs2: 'react-dom',
				commonjs: 'react-dom',
				amd: 'react-dom',
			},
		},
	],

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: Infinity
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
			}
		]
	}
};

module.exports = config;


