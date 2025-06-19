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
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		Rocket,
		Snowflake,
		Cactus,
		Diamond,
		Sun,
		Mountains,
		Anchor,
		Bank,
		TreePalm,
		Tree,
		Island,
		Circle,
		Buildings,
		FlagCheckered,
		Acorn,
		Wind,
		Horse,
		MusicNotes,
		Shrimp,
		Fish,
		GraduationCap,
		Car,
		Waves,
		Bridge,
		Tent,
		Leaf,
		Cards,
		Factory,
		Balloon,
		AppleLogo,
		Airplane,
		Drop,
		Nut,
		Lightning,
		Coffee,
		Bell,
		Lighthouse,
		Flower,
		Cheese,
		Guitar,
		Star,
		Crown,
		Hammer,
		MagnifyingGlass,
		X
	} from 'phosphor-svelte';
	import { slugify } from '$lib/utils/slugify';

	import ResourceMap from '$lib/components/ui/ResourceMap.svelte';
	import FloatingViewToggle from '$lib/components/ui/FloatingViewToggle.svelte';

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

	let currentPage = 1;
	const itemsPerPage = 20;

	let randomAd: CustomAd | null = null;
	randomAd = getRandomAd();

	let searchMode = false;
	let searchQuery = '';
	let searchInput: HTMLInputElement | null = null;

	let currentView: 'list' | 'map' = 'list';

	function clearSearch() {
		searchQuery = '';
		searchMode = false;
	}

	$: searchActive = searchQuery.trim().length > 0;
	$: if (searchQuery !== undefined) currentPage = 1;

	function selectFilter(state: string) {
		if (selectedState === state) {
			goto('/');
		} else {
			goto(`/${slugify(state)}`);
		}
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
			? resources.filter((r) => {
					const q = searchQuery.toLowerCase();
					return (
						r.title.toLowerCase().includes(q) ||
						(r.description && r.description.toLowerCase().includes(q)) ||
						addressMatchesQuery(r.address, q)
					);
				})
			: $page.params.state
				? resources.filter((r) => {
						if (typeof r.address === 'object' && r.address && 'state' in r.address) {
							return (
								String(r.address.state).trim() ===
								(filters.find((f) => slugify(f.state) === $page.params.state)?.state || '')
							);
						}
						return false;
					})
				: [...resources];
		filtered.sort((a, b) => Number(b.sponsored === true) - Number(a.sponsored === true));
		return filtered;
	})();

	$: totalPages = Math.ceil(filteredResources.length / itemsPerPage);
	$: paginatedResources = filteredResources.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	$: selectedLabel = $page.params.state
		? (filters.find((f) => slugify(f.state) === $page.params.state)?.label ?? 'All Resources')
		: 'All Resources';
	$: shouldShowAd = shouldDisplayAd(paginatedResources.length);
	$: adInsertIndex = getAdInsertIndex();
	$: if (searchMode && searchInput) searchInput.focus();

	$: selectedState = filters.find((f) => slugify(f.state) === $page.params.state)?.state || '';

	function handleFloatingToggle(view: 'list' | 'map') {
		currentView = view;
		currentPage = 1; // Reset page when switching views
	}

	function handlePageChange(page: number) {
		currentPage = page;
	}
</script>

<Hero
	align="center"
	videoBackground="/farmer-market.mp4?v=2"
	height="h-80"
	showAvatars={true}
	avatarImages={[
		'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
		'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
		'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
		'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
		'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
		'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face'
	]}
>
	<h1 class="text-2xl font-medium text-slate-900 lg:text-4xl dark:text-white">
		{selectedLabel} Farmers Markets
	</h1>
	<p class="text- max-w-lg font-light text-slate-700 dark:text-white/90">
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
						searchQuery = '';
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
						on:click={() => goto('/')}
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
