var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = 'videos';
	
	locals.data = {
		videos: [],
	};	
	
	// Load the posts
	view.on('init', function(next) {
		
		var q = keystone.list('Video').model.find()
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author');
		
		q.exec(function(err, results) {
			locals.data.videos = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('videos', {layout: 'internal'});
	
};
