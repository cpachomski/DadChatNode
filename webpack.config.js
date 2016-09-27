// based on NODE_ENV have global api base be localhost:3000
//server files from localhost:8080 and change pug to pull from live reload server
var webpack = require('webpack');

module.exports  = {
	entry: [ 
		'webpack-dev-server/client?http://localhost:8080',
    	'webpack/hot/only-dev-server',
    	__dirname + '/client/index.js'
    	],
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins:[new webpack.HotModuleReplacementPlugin()]
}