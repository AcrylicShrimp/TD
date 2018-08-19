
'use strict';

const http        = require('http');
const application = require('./application');
const httpServer  = http.createServer(application);

const socketio = require('socket.io');
const io       = socketio(httpServer);

const httpPort = process.env.PORT || 80;

httpServer.listen(httpPort, () => {
	console.log(`Http server is running on port ${httpPort}.`);
});