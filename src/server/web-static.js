
'use strict';

const serveStatic = require('serve-static');

module.exports = serveStatic(`${__dirname}/../client/`, {
	index: '/main.html'
});