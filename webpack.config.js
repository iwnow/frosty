const webpack = require('webpack'),
	{ CheckerPlugin } = require('awesome-typescript-loader'),
	UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
	path = require('path'),
	packVersion = require('./package.json').version;

module.exports = {
	entry: {
		'digger': './src/main.ts',
		'digger.min': './src/main.ts'
	},
	output: {
		filename: `[name].${packVersion}.js`,
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist',
	},

	devServer: {
		compress: true,
		port: 9000,
		index: 'index.html'
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},

	devtool: 'source-map',

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'awesome-typescript-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|jp(e*)g|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8000,
						name: 'images/[hash]-[name].[ext]'
					}
				}]
			}
		]
	},
	plugins: [
		new CheckerPlugin(),
		new UglifyJsPlugin({
			test: /\.min/,
		})
	]
};