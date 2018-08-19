
'use strict';

requirejs.config({
	baseUrl: '/'
});

define(['/lib/jquery'], ($) => {
	alert('test!');
	alert($);
});