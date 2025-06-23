import type { RequestHandler } from './$types';
import { slugify } from '$lib/utils/slugify';
import resources from '$lib/data/resources.json';
import { getAllBlogPosts } from '$lib/services/blog';

export const prerender = true;

export const GET: RequestHandler = async () => {
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

	// Get some popular markets for highlighting
	const popularMarkets = [
		{
			name: 'Ferry Plaza Farmers Market',
			state: 'California',
			description: "San Francisco's premier farmers market featuring local vendors"
		},
		{
			name: 'Santa Monica Farmers Market',
			state: 'California',
			description: "California's famous Santa Monica farmers market"
		},
		{
			name: 'Pike Place Market',
			state: 'Washington',
			description: "Seattle's iconic Pike Place Market"
		},
		{
			name: 'Green City Market Lincoln Park',
			state: 'Illinois',
			description: "Chicago's premier sustainable farmers market"
		},
		{
			name: 'Boulder Farmers Market',
			state: 'Colorado',
			description: "Colorado's popular Boulder farmers market"
		}
	];

	// Get blog posts
	const blogPosts = await getAllBlogPosts();

	const llmsTxt = `# Farmermarket

> Your complete directory of farmers markets across America. Find fresh, local produce and artisanal goods in your area with market hours, locations, and vendor information.

Farmermarket.us is a comprehensive directory of farmers markets across all 50 US states. Each market listing includes detailed information such as operating hours, exact locations with addresses, vendor information, and seasonal availability. The site helps users discover local farmers markets, support local agriculture, and find fresh produce in their area.

The directory is organized by state for easy navigation, with each state page showing all farmers markets in that region. Individual market pages provide detailed information including contact details, operating schedules, and vendor listings where available.

## Blog & Educational Content

The site features educational content about farmers markets, local food systems, and seasonal eating:

- [Blog](https://farmermarket.us/blog): Educational articles about farmers markets and local food

${blogPosts
	.map(
		(post) => `- [${post.title}](https://farmermarket.us/blog/${post.slug}): ${post.description}`
	)
	.join('\n')}

## State Directories

${states
	.map(
		(state) =>
			`- [${state} Farmers Markets](https://farmermarket.us/${slugify(state)}): Complete directory of farmers markets throughout ${state}`
	)
	.join('\n')}

## Popular Markets

${popularMarkets
	.map(
		(market) =>
			`- [${market.name}](https://farmermarket.us/${slugify(market.state)}/${slugify(market.name)}): ${market.description}`
	)
	.join('\n')}

## Site Information

- [About & FAQ](https://farmermarket.us/faq): Frequently asked questions about using the directory
- [Privacy Policy](https://farmermarket.us/privacy): Privacy policy and data handling information
- [Terms of Service](https://farmermarket.us/terms): Terms of service for using the directory

## Optional

- [All Farmers Markets](https://farmermarket.us/): Complete listing of all farmers markets nationwide
- [Sitemap](https://farmermarket.us/sitemap.xml): XML sitemap of all pages for search engines`;

	return new Response(llmsTxt, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
};
