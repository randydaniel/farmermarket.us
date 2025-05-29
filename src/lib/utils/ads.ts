import { config } from '$lib/config';

export type CustomAd = {
	id: string;
	image: string;
	url: string;
};

export type GoogleAd = {
	id: 'google-ad';
	type: 'google';
	adSlotId: string;
};

export type AdData = CustomAd | GoogleAd;

/**
 * Get a random ad from the available pool
 * Considers Google Ads frequency if enabled
 */
export function getRandomAd(): CustomAd | null {
	const { customAds, googleAds } = config.ads;

	// If no custom ads available, return null
	if (!customAds || customAds.length === 0) {
		return null;
	}

	// Future: Google Ads logic
	// if (googleAds.enabled && Math.random() < googleAds.frequency) {
	//   return { id: 'google-ad', type: 'google', adSlotId: googleAds.adSlotId };
	// }

	// Select random custom ad
	const randomIndex = Math.floor(Math.random() * customAds.length);
	return customAds[randomIndex];
}

/**
 * Check if ad should be displayed based on configuration
 */
export function shouldDisplayAd(resourceCount: number): boolean {
	const { enabled, placementRow, itemsPerRow } = config.ads;
	return enabled && resourceCount > placementRow * itemsPerRow;
}

/**
 * Calculate the index where ad should be inserted
 */
export function getAdInsertIndex(): number {
	const { placementRow, itemsPerRow } = config.ads;
	return placementRow * itemsPerRow;
}
