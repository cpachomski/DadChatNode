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
	plugins:[new webpack.HotModuleReplacementPlugin()],
	module: {
		loaders: [
	      {
	        test: /\.js$/,
	        loader: 'babel',
	        exclude: /node_modules/
	      },
	      {
	        test: /\.scss$/,
	        loaders: ['style', 'css', 'sass']
	      }
	    ],
	},
    resolve: {
    	extensions: ['', '.js', '.jsx', 'scss']
  	}
}