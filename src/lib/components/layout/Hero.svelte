<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let align: 'left' | 'center' | 'right' = 'center';
	export let videoBackground: string = '';
	export let videoBackgroundMobile: string = '';
	export let showAvatars: boolean = false;
	export let avatarImages: string[] = [];
	export let height: string = 'h-96'; // Allow customizable height

	// More robust dark mode detection
	const isDarkMode = writable(false);

	onMount(() => {
		// Initial check
		isDarkMode.set(document.documentElement.classList.contains('dark'));

		// Watch for changes
		const observer = new MutationObserver(() => {
			isDarkMode.set(document.documentElement.classList.contains('dark'));
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class']
		});

		return () => observer.disconnect();
	});

	// Reactive gradient styles
	$: gradientStyle = $isDarkMode
		? 'background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.9) 100%);'
		: 'background: radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.9) 100%);';

	// Top and bottom gradient styles for seamless blending
	$: topGradientStyle = $isDarkMode
		? 'background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%);'
		: 'background: linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, transparent 100%);';

	$: bottomGradientStyle = $isDarkMode
		? 'background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);'
		: 'background: linear-gradient(to top, rgba(255,255,255,0.9) 0%, transparent 100%);';
</script>

<section class="relative flex {height} items-center overflow-hidden bg-slate-900 px-4">
	<!-- Video Background -->
	{#if videoBackground}
		<!-- Desktop Video -->
		<video
			class="absolute inset-0 z-0 hidden h-full w-full object-cover sm:block"
			autoplay
			muted
			loop
			playsinline
			preload="auto"
		>
			<source src={videoBackground} type="video/mp4" />
		</video>

		<!-- Mobile Video -->
		{#if videoBackgroundMobile}
			<video
				class="absolute inset-0 z-0 h-full w-full object-cover sm:hidden"
				autoplay
				muted
				loop
				playsinline
				preload="auto"
			>
				<source src={videoBackgroundMobile} type="video/mp4" />
			</video>
		{:else}
			<!-- Use desktop video on mobile if no mobile video provided -->
			<video
				class="absolute inset-0 z-0 h-full w-full object-cover sm:hidden"
				autoplay
				muted
				loop
				playsinline
				preload="auto"
			>
				<source src={videoBackground} type="video/mp4" />
			</video>
		{/if}

		<!-- Video Overlay with Theme-aware Vignette (Wander-style) -->
		<div
			class="absolute inset-0 z-10 dark:hidden"
			style="background: radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.9) 100%);"
		></div>
		<div
			class="absolute inset-0 z-10 hidden dark:block"
			style="background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.9) 100%);"
		></div>

		<!-- Top gradient for nav blending -->
		<div
			class="absolute inset-x-0 top-0 z-20 h-24 dark:hidden"
			style="background: linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, transparent 100%);"
		></div>
		<div
			class="absolute inset-x-0 top-0 z-30 hidden h-24 dark:block"
			style="background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%);"
		></div>

		<!-- Bottom gradient for content blending -->
		<div
			class="absolute inset-x-0 bottom-0 z-20 h-24 dark:hidden"
			style="background: linear-gradient(to top, rgba(255,255,255,0.9) 0%, transparent 100%);"
		></div>
		<div
			class="absolute inset-x-0 bottom-0 z-30 hidden h-24 dark:block"
			style="background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);"
		></div>
	{/if}

	<!-- Content Container -->
	<div class="relative z-20 container mx-auto flex h-full flex-col justify-center px-4 xl:px-0">
		<!-- Content -->
		<div
			class={`relative max-w-2xl
			${align === 'center' ? 'mx-auto text-center' : ''}
			${align === 'left' ? 'mr-auto ml-0 text-left' : ''}
			${align === 'right' ? 'mr-0 ml-auto text-right' : ''}`}
		>
			<slot />

			<!-- Avatar Group -->
			{#if showAvatars && avatarImages.length > 0}
				<div class={`mt-6 flex flex-col items-center lg:flex-row lg:items-start`}>
					<div class="mb-2 flex -space-x-2 lg:mb-0">
						{#each avatarImages.slice(0, 5) as avatar, index}
							<img
								src={avatar}
								alt={`User ${index + 1}`}
								class="h-10 w-10 rounded-full border-2 border-white object-cover shadow-lg"
								loading="lazy"
							/>
						{/each}
						{#if avatarImages.length > 5}
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-800 text-xs font-medium text-white shadow-lg"
							>
								+{avatarImages.length - 5}
							</div>
						{/if}
					</div>
					<div class={`ml-0 text-left lg:ml-4`}>
						<p class="text-sm font-medium text-slate-800 dark:text-white/90">
							Join 7,318+ Farmers Market Enthusiasts
						</p>
						<p class="text-xs text-slate-600 dark:text-white/70">
							Discovering fresh, local produce nationwide
						</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>
