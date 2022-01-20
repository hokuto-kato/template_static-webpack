const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
	target: ["web", "es5"],
	devServer: {
		static: "./dist/",
		open: true,
		hot: true,
		bonjour: true,
	},
	entry: {
		app: `./src/js/app.js`,
	},
	output: {
		clean: true,
		path: `${__dirname}/dist/`,
		filename: "./js/[name].[contenthash].js",
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			alwaysWriteToDisk: true,
		}),
		new HtmlWebpackHarddiskPlugin(),
		new MiniCssExtractPlugin({
			filename: "./css/[name].[contenthash].css",
		}),
	],
}
