const HtmlWebpackPlugin = require("html-webpack-plugin")
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin")
const SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin")
const globule = require("globule")
const pug = globule.find("./src/pug/*.pug", {
	ignore: ["./src/pug/include/*.pug"],
})
const svg = globule.find("./src/img/*.svg").length

const app = {
	target: ["web", "es6"],
	devServer: {
		static: `${__dirname}/dist/`,
		open: true,
		hot: true,
	},
	entry: {
		app: `./src/js/app.js`,
	},
	resolve: {
		extensions: [".js", ".json", ".scss", ".sass", ".css", ".pug", ".html"],
		alias: {
			"~": `${__dirname}/src`,
		},
		roots: [`${__dirname}/src`],
	},
	plugins: [
		new HtmlWebpackHarddiskPlugin({
			outputPath: `${__dirname}/dist/`,
		}),
	],
}

pug.forEach((template) => {
	const fileName = template.replace("./src/pug/", "").replace(".pug", ".html")
	app.plugins.push(
		new HtmlWebpackPlugin({
			filename: `${fileName}`,
			template: template,
			inject: true,
			alwaysWriteToDisk: true,
			favicon: `./src/favicon/favicon.ico`,
		}),
	)
})

if (svg) {
	app.plugins.push(
		new SVGSpritemapPlugin(`./src/img/*.svg`, {
			output: {
				filename: "./img/sprite.svg",
				svgo: false,
			},
			sprite: {
				prefix: false,
				generate: {
					use: true,
					symbol: true,
					title: false,
				},
			},
			styles: {
				filename: "src/sass/sprite.scss",
				keepAttributes: true,
			}
		}),
	)
}

module.exports = app