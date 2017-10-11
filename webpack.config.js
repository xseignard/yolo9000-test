const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
	new webpack.optimize.UglifyJsPlugin(),
	new HtmlWebpackPlugin({ template: 'src/public/index.html' }),
];
module.exports = {
	entry: './src/public/main.js',
	devtool: 'eval-source-map',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }],
	},
	plugins,
	devServer: {
		// host: '0.0.0.0',
		contentBase: path.join(__dirname, 'dist'),
	},
};
