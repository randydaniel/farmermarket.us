import { error } from '@sveltejs/kit';
import { slugify } from '$lib/utils/slugify';
import { config } from '$lib/config';
import resources from '$lib/data/resources.json';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params, url }) => {
	const { category, slug } = params;

	// Find the resource that matches both slugified state and slugified title
	const resource = resources.find(
		(r) => slugify(r.address.state) === category && slugify(r.title) === slug
	);

	if (!resource) {
		throw error(404, 'Resource not found');
	}

	return {
		resource,
		siteUrl: url.origin || config.defaultSiteUrl
	};
};
