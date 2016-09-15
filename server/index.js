import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
const MongoStore = require('connect-mongo')(session)
const app = express()

//mongodb connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/dadchat')
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))

//create user sessions
//store in separate session collection
app.use(session({
	secret: 'fsmfl',
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({
		mongooseConnection: db
	})
}))

//make user's session id available to views
app.use((req, res, next) => {
	app.locals.currentUser = req.session.userId
	next()
})

//make incoming requests cool 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//serve up my static goodies from /public
app.use(express.static(`${__dirname}/../public`))

//a beautiful breed and templating engine to boot
app.set('view engine', 'pug')
app.set('views', `${__dirname}/../views`)

//use those good routes
import routes from './routes';
app.use('/', routes)

//if no route found send them a 404
app.use((req, res, next) => {
	let err = new Error('Page Not Found')
	err.status = 404
	next(err)
})

//error handler
app.use((req, res, next) => {
	res.status(err.status || 500)
	return res.render('error', {

		message: err.message,
		error: {}
	})
})

app.listen(process.env.PORT || 3000, () => {
	console.log('Serving up something good on port 3000...')
})