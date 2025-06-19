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
	import { goto } from '$app/navigation';
	import { slugify } from '$lib/utils/slugify';

	import ResourceMap from '$lib/components/ui/ResourceMap.svelte';
	import FloatingViewToggle from '$lib/components/ui/FloatingViewToggle.svelte';
	import { page } from '$app/stores';

	// Example: filter options as an array
	const filters = [
		{ label: 'Alabama', icon: Rocket, state: 'Alabama' },
		{ label: 'Alaska', icon: Snowflake, state: 'Alaska' },
		{ label: 'Arizona', icon: Cactus, state: 'Arizona' },
		{ label: 'Arkansas', icon: Diamond, state: 'Arkansas' },
		{ label: 'California', icon: Sun, state: 'California' },
		{ label: 'Colorado', icon: Mountains, state: 'Colorado' },
		{ label: 'Connecticut', icon: Anchor, state: 'Connecticut' },
		{ label: 'Delaware', icon: Bank, state: 'Delaware' },
		{ label: 'Florida', icon: TreePalm, state: 'Florida' },
		{ label: 'Georgia', icon: Tree, state: 'Georgia' },
		{ label: 'Hawaii', icon: Island, state: 'Hawaii' },
		{ label: 'Idaho', icon: Circle, state: 'Idaho' },
		{ label: 'Illinois', icon: Buildings, state: 'Illinois' },
		{ label: 'Indiana', icon: FlagCheckered, state: 'Indiana' },
		{ label: 'Iowa', icon: Acorn, state: 'Iowa' },
		{ label: 'Kansas', icon: Wind, state: 'Kansas' },
		{ label: 'Kentucky', icon: Horse, state: 'Kentucky' },
		{ label: 'Louisiana', icon: MusicNotes, state: 'Louisiana' },
		{ label: 'Maine', icon: Shrimp, state: 'Maine' },
		{ label: 'Maryland', icon: Fish, state: 'Maryland' },
		{ label: 'Massachusetts', icon: GraduationCap, state: 'Massachusetts' },
		{ label: 'Michigan', icon: Car, state: 'Michigan' },
		{ label: 'Minnesota', icon: Waves, state: 'Minnesota' },
		{ label: 'Mississippi', icon: Waves, state: 'Mississippi' },
		{ label: 'Missouri', icon: Bridge, state: 'Missouri' },
		{ label: 'Montana', icon: Tent, state: 'Montana' },
		{ label: 'Nebraska', icon: Leaf, state: 'Nebraska' },
		{ label: 'Nevada', icon: Cards, state: 'Nevada' },
		{ label: 'New Hampshire', icon: Leaf, state: 'New Hampshire' },
		{ label: 'New Jersey', icon: Factory, state: 'New Jersey' },
		{ label: 'New Mexico', icon: Balloon, state: 'New Mexico' },
		{ label: 'New York', icon: AppleLogo, state: 'New York' },
		{ label: 'North Carolina', icon: Airplane, state: 'North Carolina' },
		{ label: 'North Dakota', icon: Drop, state: 'North Dakota' },
		{ label: 'Ohio', icon: Nut, state: 'Ohio' },
		{ label: 'Oklahoma', icon: Lightning, state: 'Oklahoma' },
		{ label: 'Oregon', icon: Coffee, state: 'Oregon' },
		{ label: 'Pennsylvania', icon: Bell, state: 'Pennsylvania' },
		{ label: 'Rhode Island', icon: Lighthouse, state: 'Rhode Island' },
		{ label: 'South Carolina', icon: Flower, state: 'South Carolina' },
		{ label: 'South Dakota', icon: Cheese, state: 'South Dakota' },
		{ label: 'Tennessee', icon: Guitar, state: 'Tennessee' },
		{ label: 'Texas', icon: Star, state: 'Texas' },
		{ label: 'Utah', icon: Mountains, state: 'Utah' },
		{ label: 'Vermont', icon: Tree, state: 'Vermont' },
		{ label: 'Virginia', icon: Crown, state: 'Virginia' },
		{ label: 'Washington', icon: Leaf, state: 'Washington' },
		{ label: 'West Virginia', icon: Hammer, state: 'West Virginia' },
		{ label: 'Wisconsin', icon: Cheese, state: 'Wisconsin' },
		{ label: 'Wyoming', icon: Mountains, state: 'Wyoming' }
	];

	const allResources = resources;

	let currentPage = 1;
	const itemsPerPage = 20;

	// Randomize ad on component mount
	let randomAd: CustomAd | null = null;

	// Set random ad on mount
	randomAd = getRandomAd();

	let searchMode = false;
	let searchQuery = '';
	let searchInput: HTMLInputElement | null = null;

	// Reactive selectedState based on URL params (similar to [state] page)
	$: selectedState = filters.find((f) => slugify(f.state) === $page.params.state)?.state || '';

	function clearSearch() {
		searchQuery = '';
		searchMode = false;
	}

	$: searchActive = searchQuery.trim().length > 0;

	// Reset pagination when search query changes
	$: if (searchQuery !== undefined) {
		currentPage = 1;
	}

	function selectFilter(state: string) {
		// If the clicked state is already selected, deselect it by going to homepage
		if (selectedState === state) {
			goto('/');
		} else {
			goto(`/${slugify(state)}`);
		}
	}

	function handlePageChange(page: number) {
		currentPage = page;
		// Scroll to top when page changes
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function getAddressState(address: any): string {
		if (typeof address === 'object' && address && 'state' in address) {
			return String(address.state || '');
		}
		return '';
	}

	function addressMatchesQuery(address: any, query: string): boolean {
		if (typeof address === 'object' && address && 'state' in address) {
			const state = String(address.state || '');
			return state.toLowerCase().includes(query);
		}
		if (typeof address === 'string') {
			return address.toLowerCase().includes(query);
		}
		return false;
	}

	$: filteredResources = (() => {
		let filtered = searchActive
			? allResources.filter((r) => {
					const q = searchQuery.toLowerCase();
					return (
						r.title.toLowerCase().includes(q) ||
						(r.description && r.description.toLowerCase().includes(q)) ||
						addressMatchesQuery(r.address, q)
					);
				})
			: selectedState
				? allResources.filter((r) => {
						if (typeof r.address === 'object' && r.address && 'state' in r.address) {
							return String(r.address.state).trim() === String(selectedState).trim();
						}
						return false;
					})
				: [...allResources];

		// Sponsored first, but keep original order within groups
		filtered.sort((a, b) => Number(b.sponsored === true) - Number(a.sponsored === true));

		return filtered;
	})();

	$: totalPages = Math.ceil(filteredResources.length / itemsPerPage);
	$: paginatedResources = filteredResources.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	$: selectedLabel = selectedState
		? (filters.find((f) => f.state === selectedState)?.label ?? 'All Resources')
		: 'All Resources';

	// Smart ad placement logic using utility functions
	$: shouldShowAd = shouldDisplayAd(paginatedResources.length);
	$: adInsertIndex = getAdInsertIndex();

	$: if (searchMode && searchInput) searchInput.focus();

	let currentView: 'list' | 'map' = 'list';

	function handleFloatingToggle(view: 'list' | 'map') {
		currentView = view;
		currentPage = 1; // Reset page when switching views
	}
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

<!-- Enhanced Hero with Video Background (replace videoBackground with your video path) -->
<Hero
	align="center"
	videoBackground="/farmer-market.mp4?v=2"
	showAvatars={true}
	avatarImages={[
		'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
		'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
		'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
		'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
		'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&crop=face',
		'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face'
	]}
	height="h-80"
>
	<h1 class="text-2xl font-medium text-slate-900 lg:text-4xl dark:text-white">
		Farmers Market Directory
	</h1>
	<p class="text- max-w-lg font-light text-slate-700 dark:text-white/90">
		Find fresh, local produce and artisanal goods in your area with market hours, locations, and
		vendor information.
	</p>
</Hero>

<!-- Current Hero with Images (keep this as fallback) -->
<!-- <Hero align="center" background="/hero.avif" backgroundMobile="/hero-mobile.avif">
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
</Hero> -->

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
	{#each filters as { label, icon, state }}
		<Chip
			leftIcon={{ component: icon, props: { size: 18 } }}
			active={selectedState === state && !searchActive}
			onclick={() => selectFilter(state)}
			disabled={searchActive}
		>
			{label}
		</Chip>
	{/each}
</FilterBar>

<section class="container mx-auto px-4 py-8 lg:px-0">
	{#if currentView === 'list'}
		{#if paginatedResources.length > 0}
			<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{#each paginatedResources as resource, index}
					<!-- Insert ad at the specified row position -->
					{#if shouldShowAd && randomAd && index === adInsertIndex}
						<Ad ad={randomAd} />
					{/if}
					<ResourceCard
						title={resource.title}
						description={resource.description || ''}
						image={resource.image || '/images/resources/image-soon.png'}
						state={typeof resource.address === 'object' &&
						resource.address &&
						'state' in resource.address
							? resource.address.state
							: ''}
						externalUrl={resource.externalUrl || '#'}
						sponsored={resource.sponsored || false}
					/>
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
					{searchActive ? `No resources found for "${searchQuery}"` : 'No resources yet.'}
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
						on:click={() => (selectedState = '')}
					>
						View all resources
					</button>
				{/if}
			</div>
		{/if}
	{:else}
		<ResourceMap resources={filteredResources} />
	{/if}
</section>

<!-- Floating View Toggle (Wander-style with pagination awareness) -->
<FloatingViewToggle {currentView} onViewChange={handleFloatingToggle} />
