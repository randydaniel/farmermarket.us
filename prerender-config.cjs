const resources = require('./src/lib/data/resources.json');

// Simple slugify function (duplicated here to avoid import issues)
function slugify(text) {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();
}

// Generate all possible routes for prerendering
const entries = [
	'/',
	'/faq',
	'/privacy',
	'/terms',
	'/sitemap.xml',
	...resources.map((resource) => `/${resource.category}/${slugify(resource.title)}`)
];

module.exports = { entries };
