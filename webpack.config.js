const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清理目录
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 抽取html
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽取css

const pages = [
	{
		template: './src/views/vue_test/vue_test.html',
		filename: 'vue_test.html',
		chunks: ['vue_test']
	}		
]

module.exports = {
	mode: 'development',
	entry: {
		vue_test: './src/views/vue_test/vue_test.js' // 入口文件
	},
	output: {
		filename: 'static/js/[name].[hash:5].js',
		path: path.resolve(__dirname, './build') // 打包目录
	},
	module: {
		rules: [
			// js
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			// vue
			{
				test: /\.vue$/,
				use: ['vue-loader']
			},
			// css
			{
				test: /\.css$/,
				exclude: '/node_modules',
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader'
					}
				]
			},
			{
				test: /.less$/,
				exclude: '/node_modules',
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'less-loader',
					// {
					// 	loader: 'style-loader'
					// }, // 项目运行的时候，动态追加到html中，用style标签把样式包起来
					// {
					// 	loader: 'css-loader'
					// },
					// {
					// 	loader: 'less-loader'
					// },
					// {
					// 	loader:"postcss-loader",
					// 	options: {
					// 		plugins: () => [
					// 				require('autoprefixer') ({
					// 						overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
					// 				})
					// 		]
					// 	}
					// }
				]
			},
			// 图片
			{
				test: /\.(png|jpg|gif)$/,
				exclude: '/node_modules',
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: '[name].[hash:5].[ext]',
						outputPath: 'static/images',
						// publicPath: '../images' // 指定图片目录，解决图片路径不对的问题
					}
				}]
			}
		]
	},
	externals: {
		vue: 'Vue'
	},
	plugins: [
		new CleanWebpackPlugin(), // 默认打包目录
		new CopyWebpackPlugin([{
			from: path.resolve('public'), //将当前目录下的public
			to: 'public', //复制到output.path下的public
			ignore: ['.*']
		}]),
		new MiniCssExtractPlugin({
			filename: 'static/css/[name].[hash:5].css',
		}),
		new HtmlWebpackPlugin(pages[0])
	],



	devServer: {
		open: true, // 自动打开浏览器
		hot: true,
		compress: true, // 资源文件通过压缩传输
		port: 3001,
		noInfo: true, // 控制台不打印信息
		contentBase: 'build' // 设置根 http://localhost:3001
	},
	resolve: {
		extensions: ['.js', '.json', '.vue'],
		alias: {
			'@': path.join(__dirname, "src"),
		}
	},
	stats: {
		children: false // 用于解决Entrypoint undefined = index.html问题
	},
	
}



// function createHtml({
// 	template,
// 	filename,
// 	chunks
// }) {
// 	return new HtmlWebpackPlugin({
// 		template,
// 		filename,
// 		chunks,
// 	})
// }
// pages.forEach(element => {
// 	module.exports.plugins.push(createHtml(element))
// });