'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

//make incoming requests cool 
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

//serve up my static goodies from /public
app.use(_express2.default.static(__dirname + '/../public'));

//a beautiful breed and templating engine to boot
app.set('view engine', 'pug');
app.set('views', __dirname + '/../views');

//use and use the routes

app.use('/', _routes2.default);

//if no route found send them a 404
app.use(function (req, res, next) {
	var err = new Error('Page Not Found');
	err.status = 404;
	next(err);
});

//error handler
app.use(function (req, res, next) {
	res.status(err.status || 500);
	return res.render('error', {

		message: err.message,
		error: {}
	});
});

app.listen(process.env.PORT || 3000, function () {
	console.log('Serving up something good on port 3000...');
});
//# sourceMappingURL=index.js.map