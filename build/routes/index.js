'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/login', function (req, res, next) {
	return res.render('login', { title: 'login' });
});

router.get('/register', function (req, res, next) {
	return res.render('register', { title: 'register' });
});

exports.default = router;
//# sourceMappingURL=index.js.map