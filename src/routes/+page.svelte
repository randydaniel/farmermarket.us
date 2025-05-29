<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte';

	import FilterBar from '$lib/components/layout/FilterBar.svelte';
	import Chip from '$lib/components/ui/Chip.svelte';
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
		{ label: 'Artificial Intelligence', icon: OpenAiLogo },
		{ label: 'Web 3', icon: CurrencyBtc },
		{ label: 'Portfolios', icon: Briefcase },
		{ label: 'Startups', icon: Shapes },
		{ label: 'E-commerce', icon: CreditCard },
		{ label: 'Mobile Apps', icon: DeviceMobile },
		{ label: 'Desktop Apps', icon: Desktop },
		{ label: 'Design', icon: PaintBrush },
		{ label: 'Development', icon: Code },
		{ label: 'Tech', icon: GitBranch },
		{ label: 'SaaS', icon: ArrowsCounterClockwise }
	];

	let selected = 'Web 3';

	function selectFilter(label: string) {
		selected = label;
		// filter your resources here
	}
</script>

<Hero align="center" background="/path/to/image.jpg">
	<h1 class="text-4xl font-medium text-slate-950">Welcome!</h1>
	<p class="text-lg text-slate-600">This is a left-aligned hero section.</p>
</Hero>
<FilterBar>
	{#each filters as { label, icon }}
		<Chip
			leftIcon={{ component: icon, props: { size: 18 } }}
			active={selected === label}
			on:click={() => selectFilter(label)}
		>
			{label}
		</Chip>
	{/each}
</FilterBar>
<section>
	<div class="container mx-auto py-16">
		<h1>Welcome to SvelteKit</h1>
		<p>
			Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
		</p>
	</div>
</section>
