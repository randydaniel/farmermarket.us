<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte';

	import FilterBar from '$lib/components/layout/FilterBar.svelte';
	import Chip from '$lib/components/ui/Chip.svelte';
	import ResourceCard from '$lib/components/ui/ResourceCard.svelte';
	import Pagination from '$lib/components/ui/Pagination.svelte';
	import resources from '$lib/data/resources.json';
	import {
		OpenAiLogo,
		CurrencyBtc,
		Briefcase,
		Shapes,
		CreditCard,
		DeviceMobile,
		Desktop,
		PaintBrush,
		Code,
		GitBranch,
		ArrowsCounterClockwise
	} from 'phosphor-svelte';

	// Example: filter options as an array
	const filters = [
		{ label: 'Artificial Intelligence', icon: OpenAiLogo, category: 'artificial-intelligence' },
		{ label: 'Web 3', icon: CurrencyBtc, category: 'web-3' },
		{ label: 'Portfolios', icon: Briefcase, category: 'portfolios' },
		{ label: 'Startups', icon: Shapes, category: 'startups' },
		{ label: 'E-commerce', icon: CreditCard, category: 'e-commerce' },
		{ label: 'Mobile Apps', icon: DeviceMobile, category: 'mobile-apps' },
		{ label: 'Desktop Apps', icon: Desktop, category: 'desktop-apps' },
		{ label: 'Design', icon: PaintBrush, category: 'design' },
		{ label: 'Development', icon: Code, category: 'development' },
		{ label: 'Tech', icon: GitBranch, category: 'tech' },
		{ label: 'SaaS', icon: ArrowsCounterClockwise, category: 'saas' }
	];

	const allResources = resources;

	let selectedCategory = '';
	let currentPage = 1;
	const itemsPerPage = 20;

	function selectFilter(category: string) {
		selectedCategory = selectedCategory === category ? '' : category;
		currentPage = 1; // Reset to first page when filtering
	}

	function handlePageChange(page: number) {
		currentPage = page;
		// Scroll to top when page changes
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	$: filteredResources = selectedCategory
		? allResources.filter((r: any) => {
				return String(r.category).trim() === String(selectedCategory).trim();
			})
		: allResources;

	$: totalPages = Math.ceil(filteredResources.length / itemsPerPage);
	$: paginatedResources = filteredResources.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	$: selectedLabel = selectedCategory
		? (filters.find((f) => f.category === selectedCategory)?.label ?? 'All Resources')
		: 'All Resources';
</script>

<Hero align="center" background="/path/to/image.jpg">
	<h1 class="text-4xl font-medium text-slate-950">Welcome!</h1>
	<p class="text-lg text-slate-600">This is a left-aligned hero section.</p>
</Hero>
<FilterBar>
	{#each filters as { label, icon, category }}
		<Chip
			leftIcon={{ component: icon, props: { size: 18 } }}
			active={selectedCategory === category}
			onclick={() => selectFilter(category)}
		>
			{label}
		</Chip>
	{/each}
</FilterBar>

<section class="container mx-auto py-12">
	<h2 class="mb-6 text-xl font-semibold">
		{selectedLabel}
	</h2>
	{#if paginatedResources.length > 0}
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each paginatedResources as resource}
				<ResourceCard {...resource} />
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
			<h3 class="text-xl font-medium">No resources yet.</h3>
			<button
				class="mt-2 rounded-full bg-slate-950 px-6 py-3 font-medium text-slate-50 transition hover:bg-slate-800"
				on:click={() => (selectedCategory = '')}
			>
				View all resources
			</button>
		</div>
	{/if}
</section>
