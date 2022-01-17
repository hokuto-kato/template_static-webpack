const MODE = "development"
const enabledSourceMap = MODE === "development"
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
	mode: MODE,
	devtool: false,
	entry: {
		"app.js": `/src/js/app.js`,
		"app.css": `/src/sass/app.sass`
	},
	output: {
		clean: true,
		path: `${__dirname}/dist`,
		filename: "./js/[name]",
		assetModuleFilename: "./img/[name]"
	},
	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				type: 'asset/resource',
				generator: {
					filename: "./img/[name][ext]"
				},
			},
			{
				test: /\.sass$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
						options: {
							url: false,
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
										flexbox: true
									})
								]
							}
						}
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
				use: [MiniCssExtractPlugin.loader, "css-loader"]
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			alwaysWriteToDisk: true
		}),
		new HtmlWebpackHarddiskPlugin(),
		new MiniCssExtractPlugin({
			filename: "./css/[name]"
		})
	],
	target: ["web", "es5"],
	devServer: {
		static: "./dist/",
		open: true,
	},
};
