<script lang="ts">
	import { MapPin, List } from 'phosphor-svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let currentView: 'list' | 'map';
	export let onViewChange: (view: 'list' | 'map') => void;

	let bottomOffset = 24; // Default bottom-6 (24px)
	let isVisible = true; // Controls visibility

	onMount(() => {
		const handleScroll = () => {
			// Simple and consistent approach: look for the main content container
			const contentSection = document.querySelector('section.container');
			const pagination = document.querySelector('[data-pagination]');

			if (contentSection) {
				const contentRect = contentSection.getBoundingClientRect();
				const viewportHeight = window.innerHeight;

				// Simple visibility logic: hide when section is mostly out of view
				// Use a consistent buffer that works for both pages
				const buffer = 150;
				isVisible = contentRect.bottom > buffer;

				// Handle pagination positioning only when visible and in list view
				if (isVisible && pagination && currentView === 'list') {
					const paginationRect = pagination.getBoundingClientRect();

					// If pagination is visible near bottom, push button up
					if (paginationRect.top < viewportHeight && paginationRect.bottom > viewportHeight - 100) {
						bottomOffset = 80; // Push button higher when pagination is visible
					} else {
						bottomOffset = 24; // Normal position
					}
				} else {
					bottomOffset = 24; // Normal position for map view or no pagination
				}
			}
		};

		let ticking = false;
		const optimizedScrollHandler = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					handleScroll();
					ticking = false;
				});
				ticking = true;
			}
		};

		window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
		handleScroll(); // Initial check

		return () => {
			window.removeEventListener('scroll', optimizedScrollHandler);
		};
	});

	// React to view changes (only in browser)
	$: if (browser && currentView) {
		// Recalculate position when view changes
		setTimeout(() => {
			const pagination = document.querySelector('[data-pagination]');
			if (pagination && currentView === 'list') {
				const paginationRect = pagination.getBoundingClientRect();
				const viewportHeight = window.innerHeight;
				if (paginationRect.top < viewportHeight && paginationRect.bottom > viewportHeight - 100) {
					bottomOffset = 80;
				} else {
					bottomOffset = 24;
				}
			} else {
				bottomOffset = 24;
			}
		}, 100);
	}
</script>

<!-- Floating Toggle Button (fixed to viewport with fade transition) -->
<div
	class="fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ease-out {isVisible
		? 'pointer-events-auto opacity-100'
		: 'pointer-events-none opacity-0'}"
	style="bottom: {bottomOffset}px;"
>
	<button
		class="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 focus:outline-none dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus:ring-white"
		on:click={() => onViewChange(currentView === 'list' ? 'map' : 'list')}
		aria-label={currentView === 'list' ? 'Switch to map view' : 'Switch to list view'}
	>
		{#if currentView === 'list'}
			<MapPin size={18} />
			Map
		{:else}
			<List size={18} />
			List
		{/if}
	</button>
</div>
