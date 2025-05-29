<script lang="ts">
	import { SealCheck, ArrowUpRight, ArrowLeft } from 'phosphor-svelte';
	import { slugify } from '$lib/utils/slugify';
	import { config } from '$lib/config';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ resource, siteUrl } = data);

	// Generate the canonical URL using the site URL from load function
	$: canonicalUrl = `${siteUrl}/${resource.category}/${slugify(resource.title)}`;

	function goBack() {
		history.back();
	}

	function openExternal() {
		window.open(resource.externalUrl, '_blank', 'noopener');
	}
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
		content={`${resource.title}, ${resource.category.replace('-', ' ')}, resources, tools, directory`}
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
			"applicationCategory": "${resource.category
				.split('-')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ')}",
			"image": "${siteUrl}${resource.image}"
		}
	}
	</script>`}
</svelte:head>

<main class="mx-auto max-w-[900px] px-4 py-8">
	<!-- Back button -->
	<button
		on:click={goBack}
		class="mb-6 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-950"
	>
		<ArrowLeft size={20} />
		Back
	</button>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
		<!-- Image section -->
		<div class="order-1">
			<div class="relative overflow-hidden rounded-xl bg-slate-100">
				<img
					src={resource.image}
					alt={resource.title}
					class="h-auto w-full object-cover"
					style="aspect-ratio: 364/340;"
				/>
			</div>
		</div>

		<!-- Content section -->
		<div class="order-2 flex flex-col justify-center">
			<!-- Title with sponsored badge -->
			<div class="mb-4 flex items-center gap-2">
				<h1 class="text-3xl font-bold text-slate-950 lg:text-4xl">
					{resource.title}
				</h1>
				{#if resource.sponsored}
					<SealCheck size={24} class="text-blue-600" aria-label="Sponsored" />
				{/if}
			</div>

			<!-- Description -->
			{#if resource.description}
				<p class="mb-8 text-lg leading-relaxed text-slate-600">
					{resource.description}
				</p>
			{/if}

			<!-- Category badge -->
			<div class="mb-8">
				<span
					class="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
				>
					{resource.category
						.split('-')
						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
						.join(' ')}
				</span>
			</div>

			<!-- Action button -->
			<div>
				<button
					on:click={openExternal}
					class="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-medium text-white transition-colors hover:bg-slate-800 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 focus:outline-none"
				>
					Visit Resource
					<ArrowUpRight size={20} />
				</button>
			</div>

			<!-- Sponsored disclaimer -->
			{#if resource.sponsored}
				<p class="mt-6 text-sm text-slate-500">
					This is a sponsored resource. We may receive a commission if you visit this resource.
				</p>
			{/if}
		</div>
	</div>
</main>
