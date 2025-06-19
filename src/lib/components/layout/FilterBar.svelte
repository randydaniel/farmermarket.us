<script lang="ts">
	import { CaretLeft, CaretRight } from 'phosphor-svelte';
	import { onMount, afterUpdate } from 'svelte';
	import { page } from '$app/stores';

	// No props needed; use slot for flexibility
	export let hideGradients: boolean = false;
	let scrollEl: HTMLDivElement;
	let isDown = false;
	let startX: number;
	let scrollLeft: number;
	let showLeft = false;
	let showRight = false;

	// Store scroll position in sessionStorage to persist across route changes
	const SCROLL_STORAGE_KEY = 'filterbar-scroll-position';
	let shouldAutoScrollToActive = false;
	let currentRoute = '';

	// Track route changes to know when we should auto-scroll to active chip
	$: if ($page.url.pathname !== currentRoute) {
		currentRoute = $page.url.pathname;
		shouldAutoScrollToActive = true;
	}

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

	function saveScrollPosition() {
		if (!scrollEl) return;
		sessionStorage.setItem(SCROLL_STORAGE_KEY, scrollEl.scrollLeft.toString());
	}

	function restoreScrollPosition() {
		if (!scrollEl) return;
		const savedPosition = sessionStorage.getItem(SCROLL_STORAGE_KEY);
		if (savedPosition) {
			scrollEl.scrollLeft = parseInt(savedPosition, 10);
			updateArrows();
		}
	}

	function scrollToActiveChip() {
		if (!scrollEl || !shouldAutoScrollToActive) return;

		// Find the active chip element
		const activeChip = scrollEl.querySelector('[data-active="true"]') as HTMLElement;
		if (activeChip) {
			const chipRect = activeChip.getBoundingClientRect();
			const containerRect = scrollEl.getBoundingClientRect();

			// Check if the active chip is not fully visible
			const isChipVisible =
				chipRect.left >= containerRect.left && chipRect.right <= containerRect.right;

			if (!isChipVisible) {
				// Scroll to center the active chip
				const chipCenter = activeChip.offsetLeft + activeChip.offsetWidth / 2;
				const containerCenter = scrollEl.clientWidth / 2;
				scrollEl.scrollLeft = chipCenter - containerCenter;
				updateArrows();
			}

			// Reset the flag after we've handled the auto-scroll
			shouldAutoScrollToActive = false;
		}
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

	// Update arrows on scroll and resize, and save scroll position
	$: scrollEl &&
		(scrollEl.onscroll = () => {
			updateArrows();
			saveScrollPosition();
		});
	$: scrollEl && (window.onresize = updateArrows);

	onMount(() => {
		updateArrows();
		currentRoute = $page.url.pathname;
		// Restore scroll position after initial render
		setTimeout(restoreScrollPosition, 100);
	});

	// After each update, check if we need to scroll to the active chip (only on route changes)
	afterUpdate(() => {
		if (shouldAutoScrollToActive) {
			// Small delay to ensure DOM is fully updated
			setTimeout(() => {
				scrollToActiveChip();
			}, 50);
		}
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
