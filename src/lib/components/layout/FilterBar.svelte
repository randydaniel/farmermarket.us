<script lang="ts">
	// No props needed; use slot for flexibility
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
		e.preventDefault();
		const x = e.pageX - scrollEl.offsetLeft;
		const walk = (x - startX) * 1.5; // scroll speed
		scrollEl.scrollLeft = scrollLeft - walk;
	}

	function updateGradients() {
		if (!scrollEl) return;
		showLeft = scrollEl.scrollLeft > 0;
		showRight = scrollEl.scrollLeft + scrollEl.clientWidth < scrollEl.scrollWidth - 1;
	}

	// Update gradients on scroll and resize
	$: scrollEl && (scrollEl.onscroll = updateGradients);
	$: scrollEl && (window.onresize = updateGradients);
	// Also update on mount
	import { onMount } from 'svelte';
	onMount(() => {
		updateGradients();
	});
</script>

<section class="relative w-full border-b border-slate-200">
	<div class="relative w-full">
		{#if showLeft}
			<div
				class="pointer-events-none absolute top-0 left-1/2 z-20 h-full w-full max-w-screen-xl -translate-x-1/2"
			>
				<div
					class="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-white/90 to-transparent"
				></div>
			</div>
		{/if}
		{#if showRight}
			<div
				class="pointer-events-none absolute top-0 left-1/2 z-20 h-full w-full max-w-screen-xl -translate-x-1/2"
			>
				<div
					class="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white/90 to-transparent"
				></div>
			</div>
		{/if}
		<div
			bind:this={scrollEl}
			role="toolbar"
			tabindex="0"
			class="scrollbar-hide container mx-auto overflow-x-auto px-2 py-4 whitespace-nowrap"
			on:mousedown={handleMouseDown}
			on:mouseleave={handleMouseLeave}
			on:mouseup={handleMouseUp}
			on:mousemove={handleMouseMove}
		>
			<div class="flex gap-3">
				<slot />
			</div>
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
