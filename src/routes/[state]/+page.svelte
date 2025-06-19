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
		Hammer
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

	let currentView: 'list' | 'map' = 'list';

	function selectFilter(state: string) {
		if (selectedState === state) {
			goto('/');
		} else {
			goto(`/${slugify(state)}`);
		}
	}

	$: filteredResources = (() => {
		let filtered = $page.params.state
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
<FilterBar>
	{#each filters as { label, icon, state }}
		<Chip
			leftIcon={{ component: icon, props: { size: 18 } }}
			active={selectedState === state}
			onclick={() => selectFilter(state)}
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
				<h3 class="text-xl font-medium">No resources yet.</h3>
				<button
					class="mt-2 rounded-full bg-slate-950 px-6 py-3 font-medium text-slate-50 transition hover:bg-slate-800"
					on:click={() => goto('/')}
				>
					View all resources
				</button>
			</div>
		{/if}
	{:else}
		<ResourceMap resources={filteredResources} />
	{/if}
</section>

<!-- Floating View Toggle (Wander-style with pagination awareness) -->
<FloatingViewToggle {currentView} onViewChange={handleFloatingToggle} />
