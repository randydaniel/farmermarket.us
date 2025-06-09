<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte';
	import { config } from '$lib/config';

	import FilterBar from '$lib/components/layout/FilterBar.svelte';
	import Chip from '$lib/components/ui/Chip.svelte';
	import ResourceCard from '$lib/components/ui/ResourceCard.svelte';
	import Ad from '$lib/components/ui/Ad.svelte';
	import Pagination from '$lib/components/ui/Pagination.svelte';
	import resources from '$lib/data/resources.json';
	import { getRandomAd, shouldDisplayAd, getAdInsertIndex } from '$lib/utils/ads';
	import type { CustomAd } from '$lib/utils/ads';
	import {
		Rocket, // Alabama
		Snowflake, // Alaska
		Cactus, // Arizona
		Diamond, // Arkansas
		Sun, // California
		Mountains, // Colorado, Utah, Wyoming
		Anchor, // Connecticut
		Bank, // Delaware
		TreePalm, // Florida
		Tree, // Georgia, Vermont
		Island, // Hawaii
		Circle, // Idaho
		Buildings, // Illinois
		FlagCheckered, // Indiana
		Acorn, // Iowa
		Wind, // Kansas
		Horse, // Kentucky
		MusicNotes, // Louisiana
		Shrimp, // Maine
		Fish, // Maryland
		GraduationCap, // Massachusetts
		Car, // Michigan
		Waves, // Minnesota, Mississippi
		Bridge, // Missouri
		Tent, // Montana
		Leaf, // Nebraska, New Hampshire, Washington
		Cards, // Nevada
		Factory, // New Jersey
		Balloon, // New Mexico
		AppleLogo, // New York
		Airplane, // North Carolina
		Drop, // North Dakota
		Nut, // Ohio
		Lightning, // Oklahoma
		Coffee, // Oregon
		Bell, // Pennsylvania
		Lighthouse, // Rhode Island
		Flower, // South Carolina
		Cheese, // South Dakota, Wisconsin
		Guitar, // Tennessee
		Star, // Texas
		Crown, // Virginia
		Hammer, // West Virginia
		MagnifyingGlass,
		X
	} from 'phosphor-svelte';
	import { fade } from 'svelte/transition';
	import { scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	// Example: filter options as an array
	const filters = [
		{ label: 'Alabama', icon: Rocket, category: 'Alabama' },
		{ label: 'Alaska', icon: Snowflake, category: 'Alaska' },
		{ label: 'Arizona', icon: Cactus, category: 'Arizona' },
		{ label: 'Arkansas', icon: Diamond, category: 'Arkansas' },
		{ label: 'California', icon: Sun, category: 'California' },
		{ label: 'Colorado', icon: Mountains, category: 'Colorado' },
		{ label: 'Connecticut', icon: Anchor, category: 'Connecticut' },
		{ label: 'Delaware', icon: Bank, category: 'Delaware' },
		{ label: 'Florida', icon: TreePalm, category: 'Florida' },
		{ label: 'Georgia', icon: Tree, category: 'Georgia' },
		{ label: 'Hawaii', icon: Island, category: 'Hawaii' },
		{ label: 'Idaho', icon: Circle, category: 'Idaho' },
		{ label: 'Illinois', icon: Buildings, category: 'Illinois' },
		{ label: 'Indiana', icon: FlagCheckered, category: 'Indiana' },
		{ label: 'Iowa', icon: Acorn, category: 'Iowa' },
		{ label: 'Kansas', icon: Wind, category: 'Kansas' },
		{ label: 'Kentucky', icon: Horse, category: 'Kentucky' },
		{ label: 'Louisiana', icon: MusicNotes, category: 'Louisiana' },
		{ label: 'Maine', icon: Shrimp, category: 'Maine' },
		{ label: 'Maryland', icon: Fish, category: 'Maryland' },
		{ label: 'Massachusetts', icon: GraduationCap, category: 'Massachusetts' },
		{ label: 'Michigan', icon: Car, category: 'Michigan' },
		{ label: 'Minnesota', icon: Waves, category: 'Minnesota' },
		{ label: 'Mississippi', icon: Waves, category: 'Mississippi' },
		{ label: 'Missouri', icon: Bridge, category: 'Missouri' },
		{ label: 'Montana', icon: Tent, category: 'Montana' },
		{ label: 'Nebraska', icon: Leaf, category: 'Nebraska' },
		{ label: 'Nevada', icon: Cards, category: 'Nevada' },
		{ label: 'New Hampshire', icon: Leaf, category: 'New Hampshire' },
		{ label: 'New Jersey', icon: Factory, category: 'New Jersey' },
		{ label: 'New Mexico', icon: Balloon, category: 'New Mexico' },
		{ label: 'New York', icon: AppleLogo, category: 'New York' },
		{ label: 'North Carolina', icon: Airplane, category: 'North Carolina' },
		{ label: 'North Dakota', icon: Drop, category: 'North Dakota' },
		{ label: 'Ohio', icon: Nut, category: 'Ohio' },
		{ label: 'Oklahoma', icon: Lightning, category: 'Oklahoma' },
		{ label: 'Oregon', icon: Coffee, category: 'Oregon' },
		{ label: 'Pennsylvania', icon: Bell, category: 'Pennsylvania' },
		{ label: 'Rhode Island', icon: Lighthouse, category: 'Rhode Island' },
		{ label: 'South Carolina', icon: Flower, category: 'South Carolina' },
		{ label: 'South Dakota', icon: Cheese, category: 'South Dakota' },
		{ label: 'Tennessee', icon: Guitar, category: 'Tennessee' },
		{ label: 'Texas', icon: Star, category: 'Texas' },
		{ label: 'Utah', icon: Mountains, category: 'Utah' },
		{ label: 'Vermont', icon: Tree, category: 'Vermont' },
		{ label: 'Virginia', icon: Crown, category: 'Virginia' },
		{ label: 'Washington', icon: Leaf, category: 'Washington' },
		{ label: 'West Virginia', icon: Hammer, category: 'West Virginia' },
		{ label: 'Wisconsin', icon: Cheese, category: 'Wisconsin' },
		{ label: 'Wyoming', icon: Mountains, category: 'Wyoming' }
	];

	const allResources = resources;

	let selectedCategory = '';
	let currentPage = 1;
	const itemsPerPage = 20;

	// Randomize ad on component mount
	let randomAd: CustomAd | null = null;

	// Set random ad on mount
	randomAd = getRandomAd();

	let searchMode = false;
	let searchQuery = '';
	let searchInput: HTMLInputElement | null = null;

	function clearSearch() {
		searchQuery = '';
		searchMode = false;
	}

	$: searchActive = searchQuery.trim().length > 0;

	// Reset pagination when search query changes
	$: if (searchQuery !== undefined) {
		currentPage = 1;
	}

	function selectFilter(category: string) {
		selectedCategory = selectedCategory === category ? '' : category;
		currentPage = 1; // Reset to first page when filtering
	}

	function handlePageChange(page: number) {
		currentPage = page;
		// Scroll to top when page changes
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	$: filteredResources = (() => {
		let filtered = searchActive
			? allResources.filter((r) => {
					const q = searchQuery.toLowerCase();
					return (
						r.title.toLowerCase().includes(q) ||
						r.description.toLowerCase().includes(q) ||
						r.address.state.toLowerCase().includes(q)
					);
				})
			: selectedCategory
				? allResources.filter(
						(r) => String(r.address.state).trim() === String(selectedCategory).trim()
					)
				: [...allResources];

		// Shuffle first
		filtered = shuffle(filtered);

		// Sponsored first, but keep shuffled order within groups
		filtered.sort((a, b) => (b.sponsored === true) - (a.sponsored === true));

		return filtered;
	})();

	$: totalPages = Math.ceil(filteredResources.length / itemsPerPage);
	$: paginatedResources = filteredResources.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	$: selectedLabel = selectedCategory
		? (filters.find((f) => f.category === selectedCategory)?.label ?? 'All Resources')
		: 'All Resources';

	// Smart ad placement logic using utility functions
	$: shouldShowAd = shouldDisplayAd(paginatedResources.length);
	$: adInsertIndex = getAdInsertIndex();

	$: if (searchMode && searchInput) searchInput.focus();
</script>

<svelte:head>
	<!-- Primary SEO -->
	<title>{config.siteName} | Resource Directory</title>
	<meta name="description" content={config.siteDescription} />
	<meta
		name="keywords"
		content="resources, tools, directory, productivity, creativity, startups, AI, web3, design, development"
	/>
	<meta name="author" content={config.siteName} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={`${config.siteName} | Resource Directory`} />
	<meta property="og:description" content={config.siteDescription} />
	<meta property="og:site_name" content={config.siteName} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content={`${config.siteName} | Resource Directory`} />
	<meta property="twitter:description" content={config.siteDescription} />

	<!-- Additional SEO -->
	<meta name="robots" content="index, follow" />
	<meta name="googlebot" content="index, follow" />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "${config.siteName}",
		"description": "${config.siteDescription}",
		"url": "${config.defaultSiteUrl}",
		"potentialAction": {
			"@type": "SearchAction",
			"target": {
				"@type": "EntryPoint",
				"urlTemplate": "${config.defaultSiteUrl}/?q={search_term_string}"
			},
			"query-input": "required name=search_term_string"
		},
		"publisher": {
			"@type": "Organization",
			"name": "${config.siteName}",
			"url": "${config.defaultSiteUrl}"
		}
	}
	</script>`}
</svelte:head>

<Hero align="center" background="/hero.avif" backgroundMobile="/hero-mobile.avif">
	<h1
		class="mb-2 text-2xl font-medium text-slate-50 mix-blend-difference text-shadow-lg text-shadow-slate-950 md:text-4xl"
	>
		Farmers Market Directory
	</h1>
	<p
		class="max-w-xl text-sm font-light text-slate-100 mix-blend-difference text-shadow-md text-shadow-slate-950 md:text-lg"
	>
		Find fresh, local produce and artisanal goods in your area with market hours, locations, and
		vendor information.
	</p>
</Hero>
<FilterBar hideGradients={searchMode}>
	<svelte:fragment slot="search">
		{#if !searchMode}
			<Chip
				leftIcon={{ component: MagnifyingGlass, props: { size: 18 } }}
				active={searchActive}
				onclick={() => {
					searchMode = true;
				}}
				ariaLabel="Open search"
			/>
		{:else}
			<div class="flex w-full items-center gap-3">
				<Chip
					leftIcon={{ component: X, props: { size: 20 } }}
					active={true}
					onclick={() => {
						searchMode = false;
						searchQuery = ''; // Clear search when closing
					}}
					ariaLabel="Close search"
				/>
				<input
					class="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
					type="text"
					placeholder="Search resources..."
					bind:value={searchQuery}
					bind:this={searchInput}
					on:keydown={(e) => {
						if (e.key === 'Escape') clearSearch();
					}}
					style="min-width: 0;"
				/>
			</div>
		{/if}
	</svelte:fragment>
	{#each filters as { label, icon, category }}
		<Chip
			leftIcon={{ component: icon, props: { size: 18 } }}
			active={selectedCategory === category && !searchActive}
			onclick={() => selectFilter(category)}
			disabled={searchActive}
		>
			{label}
		</Chip>
	{/each}
</FilterBar>

<section class="container mx-auto px-4 py-12 xl:px-0">
	<h2 class="mb-6 text-xl font-semibold">
		{searchActive ? `Results for "${searchQuery}"` : selectedLabel}
	</h2>
	{#if paginatedResources.length > 0}
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each paginatedResources as resource, index}
				<!-- Insert ad at the specified row position -->
				{#if shouldShowAd && randomAd && index === adInsertIndex}
					<Ad ad={randomAd} />
				{/if}
				<ResourceCard {...resource} category={resource.address.state} />
			{/each}
		</div>

		<!-- Pagination -->
		{#if totalPages > 1}
			<div class="mt-12">
				<Pagination {currentPage} {totalPages} onPageChange={handlePageChange} />
			</div>
		{/if}
	{:else}
		<div class="flex flex-col items-center justify-center py-24">
			<h3 class="text-xl font-medium">
				{searchActive ? `No resources found for \"${searchQuery}\"` : 'No resources yet.'}
			</h3>
			{#if searchActive}
				<button
					class="mt-2 rounded-full bg-slate-950 px-6 py-3 font-medium text-slate-50 transition hover:bg-slate-800"
					on:click={clearSearch}
				>
					Clear search
				</button>
			{:else}
				<button
					class="mt-2 rounded-full bg-slate-950 px-6 py-3 font-medium text-slate-50 transition hover:bg-slate-800"
					on:click={() => (selectedCategory = '')}
				>
					View all resources
				</button>
			{/if}
		</div>
	{/if}
</section>
