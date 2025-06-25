<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		width?: number;
		height?: number;
		class?: string;
		loading?: 'lazy' | 'eager';
		sizes?: string;
		priority?: boolean;
	}

	let {
		src,
		alt,
		width,
		height,
		class: className = '',
		loading = 'lazy',
		sizes,
		priority = false
	}: Props = $props();

	// Generate different format URLs using $derived
	const webpSrc = $derived(src.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
	const avifSrc = $derived(src.replace(/\.(jpg|jpeg|png)$/i, '.avif'));

	// Set loading based on priority
	const loadingAttr = $derived(priority ? 'eager' : loading);

	// Generate srcset for responsive images if width is provided
	const srcSet = $derived(
		width ? `${src} 1x, ${src.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '@2x.$1')} 2x` : undefined
	);
	const webpSrcSet = $derived(
		width ? `${webpSrc} 1x, ${webpSrc.replace(/\.(webp)$/i, '@2x.$1')} 2x` : undefined
	);
	const avifSrcSet = $derived(
		width ? `${avifSrc} 1x, ${avifSrc.replace(/\.(avif)$/i, '@2x.$1')} 2x` : undefined
	);
</script>

<picture>
	<!-- AVIF format (best compression) -->
	<source srcset={avifSrcSet || avifSrc} type="image/avif" {sizes} />

	<!-- WebP format (good compression, broad support) -->
	<source srcset={webpSrcSet || webpSrc} type="image/webp" {sizes} />

	<!-- Fallback to original format -->
	<img
		{src}
		{alt}
		{width}
		{height}
		class={className}
		loading={loadingAttr}
		srcset={srcSet}
		{sizes}
		decoding="async"
	/>
</picture>
