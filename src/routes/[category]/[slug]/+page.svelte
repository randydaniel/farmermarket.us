<script lang="ts">
	import { SealCheck, ArrowUpRight, ArrowLeft } from 'phosphor-svelte';
	import { slugify } from '$lib/utils/slugify';
	import { config } from '$lib/config';
	import Button from '$lib/components/ui/Button.svelte';
	import Ad from '$lib/components/ui/Ad.svelte';
	import { getRandomAd } from '$lib/utils/ads';
	import type { CustomAd } from '$lib/utils/ads';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ resource, siteUrl } = data);

	// Generate the canonical URL using the site URL from load function
	$: canonicalUrl = `${siteUrl}/${resource.address.state.toLowerCase()}/${slugify(resource.title)}`;

	// Randomize ad on component mount (for individual resource pages)
	let randomAd: CustomAd | null = null;

	// Set random ad on mount
	randomAd = getRandomAd();
</script>

<svelte:head>
	<!-- Basic SEO -->
	<title>{resource.title} | {config.siteName}</title>
	<meta
		name="description"
		content={resource.description ||
			`Discover ${resource.title} and more resources on ${config.siteName}.`}
	/>
	<meta
		name="keywords"
		content={`${resource.title}, ${resource.address.state}, resources, tools, directory`}
	/>
	<meta name="author" content={config.siteName} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={`${resource.title} | ${config.siteName}`} />
	<meta
		property="og:description"
		content={resource.description ||
			`Discover ${resource.title} and more resources on ${config.siteName}.`}
	/>
	<meta property="og:image" content={`${siteUrl}${resource.image}`} />
	<meta property="og:image:width" content="364" />
	<meta property="og:image:height" content="340" />
	<meta property="og:site_name" content={config.siteName} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={canonicalUrl} />
	<meta property="twitter:title" content={`${resource.title} | ${config.siteName}`} />
	<meta
		property="twitter:description"
		content={resource.description ||
			`Discover ${resource.title} and more resources on ${config.siteName}.`}
	/>
	<meta property="twitter:image" content={`${siteUrl}${resource.image}`} />

	<!-- Additional SEO -->
	<meta name="robots" content="index, follow" />
	<meta name="googlebot" content="index, follow" />
	{#if resource.sponsored}
		<meta name="sponsored" content="true" />
	{/if}

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebPage",
		"name": "${resource.title}",
		"description": "${resource.description || `Discover ${resource.title} and more resources on ${config.siteName}.`}",
		"url": "${canonicalUrl}",
		"image": "${siteUrl}${resource.image}",
		"publisher": {
			"@type": "Organization",
			"name": "${config.siteName}",
			"url": "${siteUrl}"
		},
		"mainEntity": {
			"@type": "SoftwareApplication",
			"name": "${resource.title}",
			"description": "${resource.description || `Discover ${resource.title} and more resources on ${config.siteName}.`}",
			"url": "${resource.externalUrl}",
			"applicationCategory": "${resource.address.state
				.split('-')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ')}",
			"image": "${siteUrl}${resource.image}"
		}
	}
	</script>`}
</svelte:head>

<main class="container mx-auto max-w-[900px] px-4 py-12 xl:px-0 xl:py-24">
	<!-- Image section -->
	<div class="mb-8">
		<div class="relative overflow-hidden rounded-xl bg-slate-100">
			<img
				src={resource.image}
				alt={resource.title}
				class="h-auto w-full object-cover"
				style="aspect-ratio: 4/3;"
			/>
		</div>
	</div>

	<!-- Category badge -->
	<span
		class="mb-4 inline-block rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-700"
	>
		{resource.address.state
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')}
	</span>

	<!-- Title and Action button row -->
	<div class="mb-2 flex w-full flex-col items-start justify-between md:flex-row">
		<!-- Title with sponsored badge -->
		<div class="mb-2 flex items-center gap-2 md:mb-0">
			<h1 class="text-3xl font-bold text-slate-950 lg:text-4xl dark:text-slate-50">
				{resource.title}
			</h1>
			{#if resource.sponsored}
				<SealCheck size={24} class="text-blue-600" aria-label="Sponsored" />
			{/if}
		</div>

		<!-- Action button -->
		<div class="mb-2 flex-shrink-0 md:mb-0">
			<Button
				variant="primary"
				size="md"
				href={resource.externalUrl}
				rightIcon={{ component: ArrowUpRight, props: { size: 20 } }}
			>
				Visit Resource
			</Button>
		</div>
	</div>

	{#if resource.longDescription}
		<div
			class="text-md max-w-full leading-normal font-normal text-slate-600 md:max-w-[80%] dark:text-slate-300"
		>
			{@html resource.longDescription}
		</div>
	{:else if resource.description}
		<div
			class="text-md max-w-full leading-normal font-normal text-slate-600 md:max-w-[80%] dark:text-slate-300"
		>
			{@html resource.description}
		</div>
	{/if}

	<!-- Address and Hours -->
	{#if resource.address}
		<div class="mt-4 text-sm text-slate-700 dark:text-slate-300">
			<strong>Address:</strong>
			{resource.address.street}, {resource.address.city}, {resource.address.state}
			{resource.address.zip}
		</div>
	{/if}
	{#if resource.hours}
		<div class="mt-2 text-sm text-slate-700 dark:text-slate-300">
			<strong>Hours:</strong>
			<ul class="ml-2">
				<li>Mon: {resource.hours.monday}</li>
				<li>Tue: {resource.hours.tuesday}</li>
				<li>Wed: {resource.hours.wednesday}</li>
				<li>Thu: {resource.hours.thursday}</li>
				<li>Fri: {resource.hours.friday}</li>
				<li>Sat: {resource.hours.saturday}</li>
				<li>Sun: {resource.hours.sunday}</li>
			</ul>
		</div>
	{/if}

	<!-- Ad Section (if ads enabled and ad available) -->
	{#if config.ads.enabled && config.ads.showOnResourcePages && randomAd}
		<div class="mt-8">
			<Ad ad={randomAd} />
		</div>
	{/if}
</main>
