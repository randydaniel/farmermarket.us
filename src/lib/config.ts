// Site configuration - customize these values for your deployment
export const config = {
	siteName: 'Direx',
	siteDescription:
		'All the tools & resources you need, in one place. Boost productivity, unleash creativity, and simplify tasks with our curated collection.',
	// Default site URL - update this for your domain
	defaultSiteUrl: 'https://direx.vercel.app/',
	contactEmail: 'hey@randy.digital',
	// Ad placement configuration
	ads: {
		enabled: true,
		// Directory page ads
		placementRow: 1, // Insert ad after this row (1-based)
		itemsPerRow: 4, // Should match your grid columns (lg:grid-cols-4)
		// Individual resource page ads
		showOnResourcePages: true, // Enable/disable ads on individual resource pages
		// Custom ads pool - randomly selected
		customAds: [
			{
				id: 'soc-compliance',
				image: '/ads/soc.png',
				url: 'https://randy.digital'
			}
		],
		// Google Ads configuration (for future use)
		googleAds: {
			enabled: false,
			adSlotId: '', // Will be set when Google Ads is implemented
			frequency: 0.3 // 30% chance to show Google Ad vs custom ad
		}
	}
};
