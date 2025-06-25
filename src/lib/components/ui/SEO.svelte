<script lang="ts">
	import { config } from '$lib/config';
	import type { SEOProps } from '$lib/types/components';

	interface Props extends SEOProps {}

	let {
		title,
		description,
		canonical,
		ogImage = '/farmermarket-og.png',
		ogType = 'website',
		articleAuthor,
		articlePublishedTime,
		structuredData
	}: Props = $props();

	// Construct full title with site name
	$: fullTitle = title.includes(config.siteName) ? title : `${title} | ${config.siteName}`;

	// Construct canonical URL
	$: canonicalUrl = canonical
		? `${config.defaultSiteUrl.replace(/\/$/, '')}${canonical}`
		: undefined;

	// Construct full OG image URL
	$: fullOgImage = ogImage.startsWith('http')
		? ogImage
		: `${config.defaultSiteUrl.replace(/\/$/, '')}${ogImage}`;
</script>

<svelte:head>
	<!-- Primary SEO Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	{#if canonicalUrl}
		<link rel="canonical" href={canonicalUrl} />
	{/if}

	<!-- Open Graph Meta Tags -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={fullOgImage} />
	<meta property="og:type" content={ogType} />
	{#if canonicalUrl}
		<meta property="og:url" content={canonicalUrl} />
	{/if}
	<meta property="og:site_name" content={config.siteName} />

	<!-- Twitter Card Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={fullOgImage} />

	<!-- Article-specific meta tags -->
	{#if ogType === 'article'}
		{#if articleAuthor}
			<meta property="article:author" content={articleAuthor} />
		{/if}
		{#if articlePublishedTime}
			<meta property="article:published_time" content={articlePublishedTime} />
		{/if}
	{/if}

	<!-- Structured Data JSON-LD -->
	{#if structuredData}
		<script type="application/ld+json">
			{@html JSON.stringify(structuredData)}
		</script>
	{/if}
</svelte:head>
