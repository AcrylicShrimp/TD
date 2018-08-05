
'use strict';

const http        = require('http');
const express     = require('express');
const socketio    = require('socket.io');
const compression = require('compression');

const application = express();
const httpServer  = http.createServer(application);
const io          = socketio(httpServer);

const router = express.Router();

application.use(compression());
application.use(express.static(`${__dirname}/../client`));
application.use(router);
application.use((req, res) => {
	res.sendStatus(404);
});

const httpPort = process.env.PORT || 80;

httpServer.listen(httpPort, () => {
	console.log(`Http server is running on port ${httpPort}.`);
});