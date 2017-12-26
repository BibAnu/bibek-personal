var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Video').model.find()
			.where('state', 'published').sort('-publishedDate').populate('author').limit(3);

		q.exec(function (err, result) {
			locals.videos = result;
			next(err);
		});

	});

	// Render the view
	view.render('index');

};
