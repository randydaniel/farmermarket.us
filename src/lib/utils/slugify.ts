/**
 * Converts a string into a URL-friendly slug
 * @param text The text to convert into a slug
 * @returns A URL-friendly slug
 */
export function slugify(text: string | undefined | null): string {
	if (!text || typeof text !== 'string') {
		return '';
	}

	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '') // Remove special characters
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
		.trim(); // Remove leading/trailing spaces
}
