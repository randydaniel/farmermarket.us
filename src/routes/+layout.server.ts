import { getAllBlogPosts } from '$lib/services/blog';

// This makes all pages prerenderable by default
export const prerender = true;

export async function load() {
	// Get the latest blog post for the navigation
	const blogPosts = await getAllBlogPosts();
	const latestBlogPost = blogPosts[0] || null;

	return {
		latestBlogPost
	};
}
