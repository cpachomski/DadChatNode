import webpack from 'webpack'
import WepackDevServer from 'webpack-dev-server'
import * as config from './webpack.config'

const PORT = 8080
const HOST = 'localhost'
const HOST_URI = `http://${HOST}:${PORT}`

const devConfig = Object.assign({}, config.client, {
	name: 'dev-server',
	entry: [
		'webpack/hot/only-dev-server',
		`weback-dev-server/client?${HOST_URI}`,
		config.client.entry
	]
})
