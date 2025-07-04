export const prerender = true;
import { config } from '$lib/config';
import { slugify } from '$lib/utils/slugify';
import resources from '$lib/data/resources.json';
import { getAllBlogPosts } from '$lib/services/blog';

const site = config.defaultSiteUrl.replace(/\/$/, ''); // Remove trailing slash if present

// All US states for state-level pages
const states = [
	'Alabama',
	'Alaska',
	'Arizona',
	'Arkansas',
	'California',
	'Colorado',
	'Connecticut',
	'Delaware',
	'Florida',
	'Georgia',
	'Hawaii',
	'Idaho',
	'Illinois',
	'Indiana',
	'Iowa',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Maine',
	'Maryland',
	'Massachusetts',
	'Michigan',
	'Minnesota',
	'Mississippi',
	'Missouri',
	'Montana',
	'Nebraska',
	'Nevada',
	'New Hampshire',
	'New Jersey',
	'New Mexico',
	'New York',
	'North Carolina',
	'North Dakota',
	'Ohio',
	'Oklahoma',
	'Oregon',
	'Pennsylvania',
	'Rhode Island',
	'South Carolina',
	'South Dakota',
	'Tennessee',
	'Texas',
	'Utah',
	'Vermont',
	'Virginia',
	'Washington',
	'West Virginia',
	'Wisconsin',
	'Wyoming'
];

// Static pages (now as objects)
const staticPages = [
	{ loc: '/', changefreq: 'weekly', priority: 1.0 },
	{ loc: '/blog', changefreq: 'weekly', priority: 0.8 },
	{ loc: '/faq', changefreq: 'monthly', priority: 0.7 },
	{ loc: '/privacy', changefreq: 'monthly', priority: 0.7 },
	{ loc: '/terms', changefreq: 'monthly', priority: 0.7 }
];

// State-level pages (e.g., /california, /texas, etc.)
const statePages = states.map((state) => ({
	loc: `/${slugify(state)}`,
	changefreq: 'weekly',
	priority: 0.8
}));

// Dynamic resource pages (as objects, using slugified state and title)
const resourcePages = resources
	.filter((r) => r.address && r.address.state)
	.map((r) => ({
		loc: `/${slugify(r.address.state)}/${slugify(r.title)}`,
		changefreq: 'daily',
		priority: 0.5
	}));

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	// Get blog posts for sitemap
	const blogPosts = await getAllBlogPosts();
	const blogPages = blogPosts.map((post) => ({
		loc: `/blog/${post.slug}`,
		changefreq: 'weekly',
		priority: 0.6
	}));

	const pages = [...staticPages, ...statePages, ...resourcePages, ...blogPages];

	const body = sitemap(pages);
	const response = new Response(body);
	response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
	response.headers.set('Content-Type', 'application/xml');
	return response;
}

const sitemap = (
	pages: { loc: string; changefreq: string; priority: number }[]
) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
	xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
	xmlns:xhtml="https://www.w3.org/1999/xhtml"
	xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
	xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
	xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
	${pages
		.map(
			(page) => `
  <url>
    <loc>${site}${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
  `
		)
		.join('')}
</urlset>`;
