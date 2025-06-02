import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { entries } from './prerender-config.cjs';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: 'index.html', // This enables SPA mode for client-side routing
			precompress: false,
			strict: false // Allow dynamic routes to be handled client-side
		}),
		prerender: {
			entries,
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore 404s on dynamic routes - they'll be handled client-side
				if (path.includes('[') || path.includes(']')) {
					return;
				}
				// Otherwise, throw the error
				throw new Error(message);
			}
		}
	}
};

export default config;
