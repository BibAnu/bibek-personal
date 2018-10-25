// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone'),
	handlebars = require('express-handlebars');


// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

keystone.set('host', server_ip_address);
keystone.set('port', server_port);

keystone.init({
	'name': 'Plus977 Production',
	'brand': 'Plus977 Production',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',
	'emails': 'templates/emails',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs'
	}).engine,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'videos': 'videos',
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server
// if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
// 	console.log('----------------------------------------'
// 	+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
// 	+ '\n----------------------------------------'
// 	+ '\nYou have opted into email sending but have not provided'
// 	+ '\nmailgun credentials. Attempts to send will fail.'
// 	+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
// 	+ '\nset up your mailgun integration');
// }

keystone.start();
