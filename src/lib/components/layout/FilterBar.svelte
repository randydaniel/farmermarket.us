<script lang="ts">
	import { CaretLeft, CaretRight } from 'phosphor-svelte';
	import { onMount } from 'svelte';

	// No props needed; use slot for flexibility
	export let hideGradients: boolean = false;
	let scrollEl: HTMLDivElement;
	let isDown = false;
	let startX: number;
	let scrollLeft: number;
	let showLeft = false;
	let showRight = false;

	function handleMouseDown(e: MouseEvent) {
		isDown = true;
		scrollEl.classList.add('dragging');
		startX = e.pageX - scrollEl.offsetLeft;
		scrollLeft = scrollEl.scrollLeft;
	}

	function handleMouseLeave() {
		isDown = false;
		scrollEl.classList.remove('dragging');
	}

	function handleMouseUp() {
		isDown = false;
		scrollEl.classList.remove('dragging');
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDown) return;

		const x = e.pageX - scrollEl.offsetLeft;
		const walk = (x - startX) * 1.5; // scroll speed

		// Only prevent default if actually walking (dragging)
		if (Math.abs(walk) > 5) {
			// Threshold of 5 pixels, adjust as needed
			e.preventDefault();
		}
		scrollEl.scrollLeft = scrollLeft - walk;
	}

	function updateArrows() {
		if (!scrollEl) return;
		showLeft = scrollEl.scrollLeft > 0;
		showRight = scrollEl.scrollLeft + scrollEl.clientWidth < scrollEl.scrollWidth - 1;
	}

	function scrollToLeft() {
		if (!scrollEl) return;
		// Scroll by the visible width minus some overlap for context
		const scrollAmount = scrollEl.clientWidth * 0.8;
		scrollEl.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
	}

	function scrollToRight() {
		if (!scrollEl) return;
		// Scroll by the visible width minus some overlap for context
		const scrollAmount = scrollEl.clientWidth * 0.8;
		scrollEl.scrollBy({ left: scrollAmount, behavior: 'smooth' });
	}

	// Update arrows on scroll and resize
	$: scrollEl && (scrollEl.onscroll = updateArrows);
	$: scrollEl && (window.onresize = updateArrows);

	onMount(() => {
		updateArrows();
	});
</script>

<section
	class="sticky top-[68px] z-30 w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
>
	<div class="container mx-auto flex items-center gap-3 px-4 py-4 xl:px-0">
		<!-- Fixed search icon/input -->
		<slot name="search" />

		<!-- Horizontally scrollable chips area with arrows -->
		<div class="relative min-w-0 flex-1">
			<!-- Left arrow -->
			{#if showLeft}
				<button
					on:click={scrollToLeft}
					class="absolute top-1/2 left-0 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg dark:bg-slate-800 dark:shadow-slate-700/50"
					aria-label="Scroll left"
				>
					<CaretLeft size={16} class="text-slate-600 dark:text-slate-300" />
				</button>
			{/if}

			<!-- Scrollable content -->
			<div
				bind:this={scrollEl}
				role="toolbar"
				tabindex="0"
				class="scrollbar-hide overflow-x-auto whitespace-nowrap"
				class:pl-10={showLeft}
				class:pr-10={showRight}
				on:mousedown={handleMouseDown}
				on:mouseleave={handleMouseLeave}
				on:mouseup={handleMouseUp}
				on:mousemove={handleMouseMove}
			>
				<div class="inline-flex gap-3">
					<slot />
				</div>
			</div>

			<!-- Right arrow -->
			{#if showRight}
				<button
					on:click={scrollToRight}
					class="absolute top-1/2 right-0 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg dark:bg-slate-800 dark:shadow-slate-700/50"
					aria-label="Scroll right"
				>
					<CaretRight size={16} class="text-slate-600 dark:text-slate-300" />
				</button>
			{/if}

			<!-- Optional gradients (keeping for backward compatibility) -->
			{#if !hideGradients && showLeft}
				<div
					class="pointer-events-none absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-white/90 to-transparent dark:from-slate-950/90"
				></div>
			{/if}
			{#if !hideGradients && showRight}
				<div
					class="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white/90 to-transparent dark:from-slate-950/90"
				></div>
			{/if}
		</div>
	</div>
</section>

<style>
	/* Hide scrollbar for Webkit browsers */
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	/* Hide scrollbar for IE, Edge and Firefox */
	.scrollbar-hide {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
	:global(.dragging) {
		cursor: grabbing;
		cursor: -webkit-grabbing;
		user-select: none;
	}
</style>
