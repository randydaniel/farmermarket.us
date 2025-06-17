<script lang="ts">
	import { CaretRight } from 'phosphor-svelte';

	export let items: Array<{
		label: string;
		href?: string;
		current?: boolean;
	}> = [];
</script>

<nav aria-label="Breadcrumb" class="mb-6">
	<ol class="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
		{#each items as item, index}
			<li class="flex items-center">
				{#if index > 0}
					<CaretRight size={16} class="mx-2 text-slate-400" />
				{/if}

				{#if item.href && !item.current}
					<a
						href={item.href}
						class="transition-colors hover:text-slate-900 dark:hover:text-slate-200"
					>
						{item.label}
					</a>
				{:else}
					<span class={item.current ? 'font-medium text-slate-900 dark:text-slate-100' : ''}>
						{item.label}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
