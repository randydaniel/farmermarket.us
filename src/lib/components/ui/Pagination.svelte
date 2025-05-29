<script lang="ts">
	import { ArrowLeft, ArrowRight } from 'phosphor-svelte';

	export let currentPage: number = 1;
	export let totalPages: number = 1;
	export let onPageChange: (page: number) => void = () => {};

	$: pages = generatePageNumbers(currentPage, totalPages);

	function generatePageNumbers(current: number, total: number): (number | string)[] {
		if (total <= 7) {
			return Array.from({ length: total }, (_, i) => i + 1);
		}

		if (current <= 4) {
			return [1, 2, 3, 4, 5, '...', total];
		}

		if (current >= total - 3) {
			return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
		}

		return [1, '...', current - 1, current, current + 1, '...', total];
	}

	function goToPage(page: number) {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			onPageChange(page);
		}
	}

	function goToPrevious() {
		goToPage(currentPage - 1);
	}

	function goToNext() {
		goToPage(currentPage + 1);
	}
</script>

<nav class="flex items-center justify-center gap-2" aria-label="Pagination">
	<!-- Previous button -->
	<button
		type="button"
		class="flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
		disabled={currentPage === 1}
		on:click={goToPrevious}
		aria-label="Go to previous page"
	>
		<ArrowLeft size={16} />
		Previous
	</button>

	<!-- Page numbers -->
	{#each pages as page}
		{#if page === '...'}
			<span class="px-3 py-2 text-sm text-slate-400">...</span>
		{:else}
			<button
				type="button"
				class={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-colors
					${page === currentPage ? 'bg-slate-950 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
				on:click={() => goToPage(Number(page))}
				aria-label={`Go to page ${page}`}
				aria-current={page === currentPage ? 'page' : undefined}
			>
				{page}
			</button>
		{/if}
	{/each}

	<!-- Next button -->
	<button
		type="button"
		class="flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
		disabled={currentPage === totalPages}
		on:click={goToNext}
		aria-label="Go to next page"
	>
		Next
		<ArrowRight size={16} />
	</button>
</nav>
