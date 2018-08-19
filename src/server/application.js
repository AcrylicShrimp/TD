
'use strict';

const express     = require('express');
const application = express();

const compression = require('compression');

application.use(compression());

const webStatic        = require('./web-static');
const notFoundFallback = require('./not-found-fallback');
const errorFallback    = require('./error-fallback');

application.use(webStatic);
application.use(notFoundFallback);
application.use(errorFallback);

module.exports = application;