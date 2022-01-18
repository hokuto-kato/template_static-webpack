const MODE = "development"
const enabledSourceMap = MODE === "development"
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const autoprefixer = require("autoprefixer")

module.exports = {
	mode: MODE,
	target: ["web", "es5"],
	devtool: 'inline-source-map',
	devServer: {
		static: "./dist/",
		open: true,
	},
	entry: {
		app: `./src/js/app.js`,
	},
	output: {
		clean: true,
		path: `${__dirname}/dist/`,
		filename: "./js/[name].js",
	},
	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				type: "asset/resource",
				generator: {
					filename: "./img/[name][ext]",
				},
			},
			{
				test: /\.sass$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					// {loader: "style-loader"},
					{
						loader: "css-loader",
						options: {
							url: true,
							sourceMap: enabledSourceMap,
							importLoaders: 2,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									autoprefixer({
										grid: true,
										flexbox: true,
									}),
								],
							},
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: enabledSourceMap,
						},
					},
				],
			},
			{
				test: /\.js$/i,
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env"],
				},
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader"
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			alwaysWriteToDisk: true,
		}),
		new HtmlWebpackHarddiskPlugin(),
		new MiniCssExtractPlugin({
			filename: "./css/[name].css",
		}),
	],
}
