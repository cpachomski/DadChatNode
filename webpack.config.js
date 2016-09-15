import path from 'path'

export const CLIENT_DIR = __dirname + '/client'
export const SERVER_DIR = __dirname + '/server'
export const DIST_DIR   = __dirname + '/dist'

export const babelLoader = {
	test: /\.js$/,
	include: CLIENT_DIR,
	exclude: /node_modules/,
	loader: 'babel-loader',
}

export const cssLoader = {
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
}


export const client = {
	name: 'client',
	target: 'web',
	context: CLIENT_DIR,
	entry: './index.js',
	output: {
		path: DIST_DIR,
		filename: 'bundle.js'
	},
	module: {
		loaders: [babelLoader, cssLoader]
	},
	resolve: {
		extensions: ['', '.js', '.scss']
	},
	plugins: [
		new ExtractTextPlugin('bundle.css', {allChunks: true})
	]
}

export const server = {
	name: 'server',
	target: 'node',
	context: CLIENT_DIR,
	entry: {
		app: 'components/index.js'
	},
	output: {
		path: SERVER_DIR,
		filename: '[name].js',
		libraryTarget: 'commonjs2'
	},
	externals: /^[a-z\-0-9]+$/,
	module: {
		loaders: [babelLoader, cssLoader]
	},
	resolve: {
		extensions: ['', '.js', '.scss']
	},
	plugins: [
    	new ExtractTextPlugin('[name].css')
  	]
}

export default [client, server]