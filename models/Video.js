var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Video Model
 * ==========
 */

var Video = new keystone.List('Video', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Video.add({
	title: { type: String, required: true },
	link: { type: String },	
	publishedDate: { type: Date, default: Date.now },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	image: { type: Types.CloudinaryImage },
	description: { type: Types.Html, wysiwyg: true, height: 150 },
});

Video.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Video.register();
